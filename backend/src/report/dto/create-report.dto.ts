import {IsString, IsUUID} from "class-validator";

export class CreateReportDto {
    @IsString()
    report: string

    @IsUUID(undefined)
    recordId: string
}
