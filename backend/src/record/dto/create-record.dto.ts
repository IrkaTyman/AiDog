import {IsArray, IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class CommentsFromUserDTO {
    @IsString()
    nickname: string;

    @IsString()
    message: string;

    @IsString()
    time: string
}

export class CreateRecordDto {
    @IsString()
    name: string;

    @IsString()
    previewSrc: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommentsFromUserDTO)
    comments: CommentsFromUserDTO[];
}
