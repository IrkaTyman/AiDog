import {Controller} from '@nestjs/common';
import {ResultService} from './result.service';

@Controller('result')
export class ResultController {
    constructor(private readonly resultService: ResultService) {
    }
}
