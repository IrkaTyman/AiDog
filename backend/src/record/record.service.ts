import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRecordDto} from './dto/create-record.dto';
import {Record} from "./entities/record.entity";
import {In, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CommentService} from "../comment/comment.service";
import {RecordTrigger} from "../record_triggers/entities/record_trigger.entity";
import {Trigger} from "../trigger/entities/trigger.entity";
import {GetRecordsDto} from "./dto/get-records.dto";
import {ResultService} from "../result/result.service";

@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>,
        @InjectRepository(Trigger)
        private readonly triggerRepository: Repository<Trigger>,
        @InjectRepository(RecordTrigger)
        private readonly recordTriggerRepository: Repository<RecordTrigger>,
        private readonly commentService: CommentService,
        private readonly resultService: ResultService,
    ) {
    }

    async create(createRecordDto: CreateRecordDto) {
        const comments = createRecordDto.comments;
        const triggers = await this.triggerRepository.find({where: {isActive: true}});

        const newRecord = await this.recordRepository.save({
            name: createRecordDto.name,
            previewSrc: createRecordDto.previewSrc
        });

        let results = await fetch(
            "http://89.208.216.16/make_conclusions", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comments
                })
            })
            .then(response => response.json())
            .then(result => result)
            .catch(error => {
                throw new BadRequestException()
            })

        for (let result in results) {
            await this.resultService.create({
                result,
                recordId: newRecord.id
            })
        }

        let commentsWithTriggers = await fetch(
            "http://89.208.216.16/process_comments", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comments,
                    triggers
                })
            })
            .then(response => response.json())
            .then(result => result)
            .catch(error => {
                throw new BadRequestException()
            })

        for (let comment of commentsWithTriggers.comments) {
            const {commentID} = await this.commentService.create({
                recordId: newRecord.id,
                studentNickname: comment.nickname,
                message: comment.message,
                time: comment.time,
            })

            for (let trigger of comment.triggers) {
                const isTriggerExist = await this.triggerRepository.existsBy({id: trigger});

                if (!isTriggerExist)
                    throw new BadRequestException("The trigger doesn't exist!");

                const newRecordTrigger = await this.recordTriggerRepository.save({
                    comment: {id: commentID},
                    trigger: {id: trigger},
                    record: {id: newRecord.id}
                })
            }
        }

        return;
    }

    async findAll(getRecordsDto: GetRecordsDto) {
        const records =  await this.recordRepository.find({
            where: {
                status: getRecordsDto.status ? getRecordsDto.status : undefined,
                triggers: getRecordsDto.triggers ? {
                    trigger: {
                        id: In(getRecordsDto.triggers)
                    }
                } : undefined
            },
            relations: {
                triggers: {
                    trigger: true
                },
                results: true
            },

        })

        const result = []
        for(let record of records) {
            const triggerTypes = await this.recordTriggerRepository.query(
                `SELECT t.type, COUNT(rt.id)
                 FROM record_trigger AS rt
                     LEFT JOIN record AS r ON rt.record=r.id
                     LEFT JOIN trigger AS t ON rt.trigger=t.id
                 WHERE rt.record = '${record.id}'
                 GROUP BY t.type`
            );
            const commentsCount = await this.commentService.getCountByRecord(record.id);
            result.push({
                id: record.id,
                name: record.name,
                previewSrc: record.previewSrc,
                status: record.status,
                triggerTypes,
                commentsCount
            });
        }

        return result
    }

    async findOne(id: string) {
        const isExist = await this.recordRepository.existsBy({id});

        if (!isExist)
            throw new NotFoundException("Record not found!");

        const record = await this.recordRepository.findOne({
            where: {id},
            relations: {
                comments: {
                    triggers: {
                        trigger: true
                    }
                },
                reports: {
                    user: true
                },
                results: true
            },
            order: {comments: {time: "asc"}}
        });

        const triggersCount = await this.recordTriggerRepository.query(
            `SELECT record_trigger.trigger, COUNT(id)
             FROM record_trigger
             WHERE record = '${id}'
             GROUP BY trigger`
        );

        return {
            ...record,
            triggersCount
        };
    }
}
