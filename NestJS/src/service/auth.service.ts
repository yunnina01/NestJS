import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "src/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signup(newUser: UserDTO): Promise<UserDTO | undefined> {
        const userFind: UserDTO = await this.userService.findByFiled({
            where: { username: newUser.username }
        });
        if (userFind) {
            throw new HttpException('The username already exists', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }
}