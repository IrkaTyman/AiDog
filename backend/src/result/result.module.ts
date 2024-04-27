import {Module} from '@nestjs/common';
import {ResultService} from './result.service';
import {ResultController} from './result.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Record} from "../record/entities/record.entity";
import {Result} from "./entities/result.entity";
import {Comment} from "../comment/entities/comment.entity";
import {RecordTrigger} from "../record_triggers/entities/record_trigger.entity";
import {Trigger} from "../trigger/entities/trigger.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Result, Record, Comment, RecordTrigger, Trigger])],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
