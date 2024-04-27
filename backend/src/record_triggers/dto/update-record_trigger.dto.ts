import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordTriggerDto } from './create-record_trigger.dto';

export class UpdateRecordTriggerDto extends PartialType(CreateRecordTriggerDto) {}
