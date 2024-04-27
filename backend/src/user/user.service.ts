import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const isExistUserEmail = await this.userRepository.findOne({
            where: {email: createUserDto.email},
        })

        if (isExistUserEmail) {
            throw new BadRequestException('This email already exist!')
        }

        const user = await this.userRepository.save({
            ...createUserDto,
            password: await argon2.hash(createUserDto.password)
        })

        return {userID: user.id};
    }

    async findOne(email: string) {
        const user = await this.userRepository.findOne({
            where: {email}
        });

        if (!user)
            throw new NotFoundException('The user is not found!')

        return user
    }

    async findOneById(id: string) {
        const user = await this.userRepository.findOne({
            where: {id}
        });

        if (!user)
            throw new NotFoundException('The user is not found!')

        return user
    }
}
