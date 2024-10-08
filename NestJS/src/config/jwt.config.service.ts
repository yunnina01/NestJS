import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: Number(this.configService.get<string>('JWT_EXPIRESIN')) }
        }
    }
}