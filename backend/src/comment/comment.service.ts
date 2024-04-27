import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Record} from "../record/entities/record.entity";
import {Comment} from "./entities/comment.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>,
    ) {
    }

    async create(createCommentDto: CreateCommentDto) {
        const isRecordExist = await this.recordRepository.existsBy({id: createCommentDto.recordId})

        if (!isRecordExist)
            throw new BadRequestException("The record doesn't exist!");

        const newComment = {
            ...createCommentDto,
            record: {id: createCommentDto.recordId},
        };

        const res = await this.commentRepository.save(newComment);
        return {commentID: res.id}
    }

    findAll() {
        return `This action returns all comment`;
    }

    async getCountByRecord(recordId: string) {
        const isRecordExist = await this.recordRepository.existsBy({id: recordId})

        if (!isRecordExist)
            throw new BadRequestException("The record doesn't exist!");

        return await this.commentRepository.countBy({record: {id: recordId}});
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }
}
