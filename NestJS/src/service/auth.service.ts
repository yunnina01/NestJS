import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDTO } from "src/dto/user.dto";
import { User } from "src/entity/user.entity";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signup(newUser: UserDTO): Promise<UserDTO | undefined> {
        const user: User = await this.userService.findByField({
            where: { username: newUser.username }
        });
        if (user) {
            throw new HttpException('The username already exists', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    async login(userDTO: UserDTO): Promise<{ accessToken: string } | undefined> {
        const user: User = await this.userService.findByField({
            where: { username: userDTO.username }
        });
        if (!user || !await bcrypt.compare(userDTO.password, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { username: user.username };
        return { accessToken: this.jwtService.sign(payload) };
    }
}