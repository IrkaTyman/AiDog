import {Module} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CommentController} from './comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "./entities/comment.entity";
import {Record} from "../record/entities/record.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Record])],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {
}
