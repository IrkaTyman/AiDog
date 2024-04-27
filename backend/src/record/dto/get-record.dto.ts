import {IsUUID} from "class-validator";

export class GetRecordDto {
    @IsUUID(undefined)
    id: string;
}
