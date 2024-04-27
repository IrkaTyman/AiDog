import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRecordDto} from './dto/create-record.dto';
import {Record} from "./entities/record.entity";
import {In, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CommentService} from "../comment/comment.service";
import {RecordTrigger} from "../record_triggers/entities/record_trigger.entity";
import {Trigger} from "../trigger/entities/trigger.entity";
import {GetRecordsDto} from "./dto/get-records.dto";

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
    ) {
    }

    async create(createRecordDto: CreateRecordDto) {
        const comments = createRecordDto.comments;
        const triggers = await this.triggerRepository.find();

        console.log(comments, triggers) // типа отправил на NLP API

        const newRecord = await this.recordRepository.save({
            name: createRecordDto.name,
            previewSrc: createRecordDto.previewSrc
        });

        const r = {
            comments: [
                {
                    nickname: "CatDev",
                    message: "Привет, всем!",
                    time: "9:51:49",
                    triggers: []
                },
                {
                    nickname: "AhidovR",
                    message: "Привет, <Мат>сука</Мат>!",
                    time: "9:51:55",
                    triggers: [
                        {
                            id: "e335ea7e-c816-4a88-b7b9-2ce7d5ead44e",
                            data: {
                                "message": "сука"
                            }
                        }
                    ]
                },
                {
                    nickname: "Tuman",
                    message: "<Реклама>https://catdeveloper.ru/blog</Реклама>",
                    time: "9:52:32",
                    triggers: [
                        {
                            id: "fa097bd5-9696-4412-8d24-0601ec4cbfaf",
                            data: {
                                "link": "https://catdeveloper.ru/blog"
                            }
                        }
                    ]
                }
            ]
        }

        for (let comment of r.comments) {
            const {commentID} = await this.commentService.create({
                recordId: newRecord.id,
                studentNickname: comment.nickname,
                message: comment.message,
                time: comment.time,
            })

            for (let trigger of comment.triggers) {
                const isTriggerExist = await this.triggerRepository.existsBy({id: trigger.id});

                if (!isTriggerExist)
                    throw new BadRequestException("The trigger doesn't exist!");

                const newRecordTrigger = await this.recordTriggerRepository.save({
                    comment: {id: commentID},
                    trigger: {id: trigger.id},
                    record: {id: newRecord.id}
                })
            }
        }

        return;
    }

    async findAll(getRecordsDto: GetRecordsDto) {
        const records =  await this.recordRepository.find({
            where: {
                status: getRecordsDto.status,
                triggers: getRecordsDto.triggers ? {
                    trigger: {
                        id: In(getRecordsDto.triggers)
                    }
                } : undefined
            },
            relations: {
                triggers: {
                    trigger: true
                }
            }
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
            result.push({
                id: record.id,
                name: record.name,
                previewSrc: record.previewSrc,
                status: record.status,
                triggerTypes
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
                }
            }
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
