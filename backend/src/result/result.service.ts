import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateResultDto} from './dto/create-result.dto';
import {Record} from "../record/entities/record.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Result} from "./entities/result.entity";

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>,
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>,
    ) {
    }

    async create(createResultDto: CreateResultDto) {
        const isExist = await this.recordRepository.existsBy({id: createResultDto.recordId});

        if (!isExist)
            throw new NotFoundException("Record not found!");

        const newResult = {
            result: createResultDto.result,
            record: {id: createResultDto.recordId},
        }

        const res = await this.resultRepository.save(newResult);
        return {resultID: res.id}
    }
}
