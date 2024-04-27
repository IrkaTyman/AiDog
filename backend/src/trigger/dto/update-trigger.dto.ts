import {IsEnum, IsNumber, IsString, NotEquals, ValidateIf} from "class-validator";
import {TriggerTypes} from "../entities/trigger.entity";

export class UpdateTriggerDto {
    @IsString()
    @ValidateIf((_, value) => value !== undefined)
    name?: string

    @IsString()
    @ValidateIf((_, value) => value !== undefined)
    description?: string

    @IsString()
    @ValidateIf((_, value) => value !== undefined)
    examples?: string;

    @IsString()
    @ValidateIf((_, value) => value !== undefined)
    color?: string;

    @IsString()
    @IsEnum(TriggerTypes)
    type: TriggerTypes;
}
