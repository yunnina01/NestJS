import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configservice: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configservice.get<string>('MYSQL_HOST'),
            port: this.configservice.get<number>('MYSQL_PORT'),
            username: this.configservice.get<string>('MYSQL_USER'),
            password: this.configservice.get<string>('MYSQL_PASS'),
            database: this.configservice.get<string>('MYSQL_DATABASE'),
            entities: [__dirname + '/../entity/*.entity.{ts,js}'],
            synchronize: true,
        }
    }
}