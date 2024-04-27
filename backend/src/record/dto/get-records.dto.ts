import {IsArray, IsEnum, IsOptional} from "class-validator";
import {Transform} from "class-transformer";
import {RecordStatus} from "../entities/record.entity";

export class GetRecordsDto {
    @IsOptional()
    @Transform(({ value }) => ("" + value).toLowerCase())
    @IsEnum(RecordStatus)
    status?: RecordStatus;

    @IsOptional()
    @IsArray()
    triggers?: string[];
}
