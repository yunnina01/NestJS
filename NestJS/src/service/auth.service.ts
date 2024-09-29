import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "src/dto/user.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signup(newUser: UserDTO): Promise<UserDTO | undefined> {
        const userFind: UserDTO = await this.userService.findByField({
            where: { username: newUser.username }
        });
        if (userFind) {
            throw new HttpException('The username already exists', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    async login(userDTO: UserDTO): Promise<string | undefined> {
        const userFind: UserDTO = await this.userService.findByField({
            where: { username: userDTO.username }
        });
        if (!userFind || !await bcrypt.compare(userDTO.password, userFind.password)) {
            throw new UnauthorizedException();
        }
        return "Login Success";
    }
}