import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {RecordService} from './record.service';
import {CreateRecordDto} from './dto/create-record.dto';
import {UpdateRecordDto} from './dto/update-record.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {GetRecordDto} from "./dto/get-record.dto";
import {GetRecordsDto} from "./dto/get-records.dto";

@Controller('record')
export class RecordController {
    constructor(private readonly recordService: RecordService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createRecordDto: CreateRecordDto) {
        return this.recordService.create(createRecordDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findAll(@Body() getRecordsDto: GetRecordsDto) {
        return this.recordService.findAll(getRecordsDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    findOne(@Param() getRecordDto: GetRecordDto) {
        return this.recordService.findOne(getRecordDto.id);
    }
}
