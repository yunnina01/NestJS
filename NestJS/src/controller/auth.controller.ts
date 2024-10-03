import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "src/service/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UserDTO } from "src/dto/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() userDTO: UserDTO): Promise<UserDTO | undefined> {
        return await this.authService.signup(userDTO)
    }

    @Get('login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.login(userDTO);
        res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
        return res.json(jwt);
    }

    @Post('jwt-test')
    @UseGuards(AuthGuard())
    jwtTest(@Req() req: Request) {
        console.log(req.user);
    }
}