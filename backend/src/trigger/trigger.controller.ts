import {Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {TriggerService} from './trigger.service';
import {CreateTriggerDto} from './dto/create-trigger.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('trigger')
export class TriggerController {
    constructor(private readonly triggerService: TriggerService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createTriggerDto: CreateTriggerDto) {
        return this.triggerService.create(createTriggerDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findAll() {
        return this.triggerService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findOne(@Param('id') id: string) {
        return this.triggerService.findOne(id);
    }
}
