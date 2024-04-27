import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Trigger} from "./entities/trigger.entity";
import {Repository} from "typeorm";
import {CreateTriggerDto} from "./dto/create-trigger.dto";

@Injectable()
export class TriggerService {
    constructor(
        @InjectRepository(Trigger)
        private readonly triggerRepository: Repository<Trigger>,
    ) {
    }

    async create(createTriggerDto: CreateTriggerDto) {
        const isTriggerExist = await this.triggerRepository.existsBy({name: createTriggerDto.name})

        if (isTriggerExist)
            throw new BadRequestException("The trigger already exist!");

        const res = await this.triggerRepository.save(createTriggerDto);
        return {triggerID: res.id}
    }

    async findAll() {
        return await this.triggerRepository.find()
    }

    async findOne(id: string) {
        const isExist = await this.triggerRepository.existsBy({id})

        if (!isExist)
            throw new NotFoundException("Trigger not found!")

        return await this.triggerRepository.findOne({
                where: {id}
            },
        )
    }
}
