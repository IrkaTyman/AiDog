import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordTriggersService } from './record_triggers.service';
import { CreateRecordTriggerDto } from './dto/create-record_trigger.dto';
import { UpdateRecordTriggerDto } from './dto/update-record_trigger.dto';

@Controller('record-triggers')
export class RecordTriggersController {
  constructor(private readonly recordTriggersService: RecordTriggersService) {}

  @Post()
  create(@Body() createRecordTriggerDto: CreateRecordTriggerDto) {
    return this.recordTriggersService.create(createRecordTriggerDto);
  }

  @Get()
  findAll() {
    return this.recordTriggersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordTriggersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordTriggerDto: UpdateRecordTriggerDto) {
    return this.recordTriggersService.update(+id, updateRecordTriggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordTriggersService.remove(+id);
  }
}
