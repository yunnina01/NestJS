import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "src/dto/user.dto";
import { User } from "src/entity/user.entity";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findByField(options: FindOneOptions<UserDTO>): Promise<UserDTO | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        await this.passwordEncryption(userDTO);
        return await this.userRepository.save(userDTO);
    }

    async passwordEncryption(userDTO: UserDTO): Promise<void> {
        userDTO.password = await bcrypt.hash(userDTO.password, 10);
        return Promise.resolve();
    }
}