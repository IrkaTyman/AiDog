import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {TriggerService} from './trigger.service';
import {CreateTriggerDto} from './dto/create-trigger.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {GetTriggerDto} from "./dto/get-trigger.dto";
import {RemoveTriggerDto} from "./dto/remove-trigger.dto";

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
    findOne(@Param() getTriggerDto: GetTriggerDto) {
        return this.triggerService.findOne(getTriggerDto.id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    remove(@Param() removeTriggerDto: RemoveTriggerDto) {
        return this.triggerService.remove(removeTriggerDto.id);
    }
}
