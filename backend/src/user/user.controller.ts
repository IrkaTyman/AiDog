import {Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('/')
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    findOneByAccessToken(@Req() req) {
        return this.userService.findOneById(req.user.id);
    }

    @Get('/:login')
    @UsePipes(new ValidationPipe())
    findOneByLogin(@Param('login') login: string) {
        return this.userService.findOne(login);
    }
}
