import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "src/service/auth.service";
import { UserDTO } from "src/dto/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Req() req: Request, @Body() userDTO: UserDTO): Promise<UserDTO | undefined> {
        return await this.authService.signup(userDTO)
    }

    @Get('login')
    async login(@Body() userDTO: UserDTO): Promise<string | undefined> {
        return await this.authService.login(userDTO);
    }
}