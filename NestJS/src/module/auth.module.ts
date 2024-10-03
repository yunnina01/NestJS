import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "src/config/jwt.config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/controller/auth.controller";
import { AuthService } from "src/service/auth.service";
import { UserService } from "src/service/user.service";
import { JwtStrategy } from "src/passport/jwt.strategy";
import { User } from "src/entity/user.entity";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}