import {TriggerTypes} from "../entities/trigger.entity";
import {IsEnum, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class CreateTriggerDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    examples: string;

    @IsString()
    color: string;

    @Transform(({ value }) => ("" + value).toLowerCase())
    @IsEnum(TriggerTypes)
    type: TriggerTypes;
}
