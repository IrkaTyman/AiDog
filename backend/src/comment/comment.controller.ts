import {Controller, Get, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {CommentService} from './comment.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findAll() {
        return this.commentService.findAll();
    }
}
