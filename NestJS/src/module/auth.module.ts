import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "src/controller/auth.controller";
import { AuthService } from "src/service/auth.service";
import { UserService } from "src/service/user.service";
import { User } from "src/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {}