import { Injectable } from '@nestjs/common';
import { CreateRecordTriggerDto } from './dto/create-record_trigger.dto';
import { UpdateRecordTriggerDto } from './dto/update-record_trigger.dto';

@Injectable()
export class RecordTriggersService {
  create(createRecordTriggerDto: CreateRecordTriggerDto) {
    return 'This action adds a new recordTrigger';
  }

  findAll() {
    return `This action returns all recordTriggers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recordTrigger`;
  }

  update(id: number, updateRecordTriggerDto: UpdateRecordTriggerDto) {
    return `This action updates a #${id} recordTrigger`;
  }

  remove(id: number) {
    return `This action removes a #${id} recordTrigger`;
  }
}
