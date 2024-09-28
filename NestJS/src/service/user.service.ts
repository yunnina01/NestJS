import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/dto/user.dto";
import { User } from "src/entity/user.entity";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findByFiled(options: FindOneOptions<UserDTO>): Promise<UserDTO | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        return await this.userRepository.save(userDTO);
    }
}