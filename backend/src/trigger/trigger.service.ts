import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Trigger} from "./entities/trigger.entity";
import {Repository} from "typeorm";
import {CreateTriggerDto} from "./dto/create-trigger.dto";
import {UpdateTriggerDto} from "./dto/update-trigger.dto";

@Injectable()
export class TriggerService {
    constructor(
        @InjectRepository(Trigger)
        private readonly triggerRepository: Repository<Trigger>,
    ) {
    }

    async create(createTriggerDto: CreateTriggerDto) {
        const isTriggerExist = await this.triggerRepository.existsBy({name: createTriggerDto.name, isActive: true})

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

    async update(id: string, updateTriggerDto: UpdateTriggerDto) {
        const trigger = await this.triggerRepository.findOneBy({id})

        if (!trigger)
            throw new NotFoundException("Trigger not found!")

        await this.triggerRepository.update(id, {
            name: "name" in updateTriggerDto ? updateTriggerDto.name : undefined,
            description: "description" in updateTriggerDto ? updateTriggerDto.description : undefined,
            examples: "examples" in updateTriggerDto ? updateTriggerDto.examples : undefined,
            color: "color" in updateTriggerDto ? updateTriggerDto.color : undefined,
        });

        return this.triggerRepository.findOne({
            where: {id}
        })
    }

    async remove(id: string) {
        const isExist = await this.triggerRepository.existsBy({id})

        if (!isExist)
            throw new NotFoundException("Trigger not found!")

        return await this.triggerRepository.update(id, {
            isActive: false
        })
    }
}
