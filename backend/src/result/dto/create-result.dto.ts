import {IsString, IsUUID} from "class-validator";

export class CreateResultDto {
    @IsString()
    result: string

    @IsUUID()
    recordId: string
}
