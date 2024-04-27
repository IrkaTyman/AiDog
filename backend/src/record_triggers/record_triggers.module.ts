import { Module } from '@nestjs/common';
import { RecordTriggersService } from './record_triggers.service';
import { RecordTriggersController } from './record_triggers.controller';

@Module({
  controllers: [RecordTriggersController],
  providers: [RecordTriggersService],
})
export class RecordTriggersModule {}
