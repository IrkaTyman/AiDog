import {IsUUID} from "class-validator";

export class GetTriggerDto {
    @IsUUID(undefined)
    id: string;
}
