import {Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {ReportService} from './report.service';
import {CreateReportDto} from './dto/create-report.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createReportDto: CreateReportDto, @Req() req) {
        return this.reportService.create(createReportDto, req.user.id);
    }
}
