import {Module} from '@nestjs/common';
import {ReportService} from './report.service';
import {ReportController} from './report.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Record} from "../record/entities/record.entity";
import {Report} from "./entities/report.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Record, Report])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
