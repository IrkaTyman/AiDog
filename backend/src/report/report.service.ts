import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateReportDto} from './dto/create-report.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Report} from "./entities/report.entity"
import {Record, RecordStatus} from "../record/entities/record.entity";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>,
    ) {
    }

    async create(createReportDto: CreateReportDto, userId: string) {
        const isExist = await this.recordRepository.existsBy({id: createReportDto.recordId});

        if (!isExist)
            throw new NotFoundException("Record not found!");

        const newReport = {
            report: createReportDto.report,
            record: {id: createReportDto.recordId},
            user: {id: userId}
        }

        const res = await this.reportRepository.save(newReport);

        await this.recordRepository.update(createReportDto.recordId, {
            status: RecordStatus.OLD
        });

        return {reportID: res.id}
    }
}
