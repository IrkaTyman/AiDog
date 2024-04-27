import {IsUUID} from "class-validator";

export class RemoveTriggerDto {
    @IsUUID(undefined)
    id: string;
}
