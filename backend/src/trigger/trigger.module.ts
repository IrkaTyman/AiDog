import {Module} from '@nestjs/common';
import {TriggerService} from './trigger.service';
import {TriggerController} from './trigger.controller';
import {Trigger} from "./entities/trigger.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Trigger])],
    controllers: [TriggerController],
    providers: [TriggerService],
})
export class TriggerModule {
}
