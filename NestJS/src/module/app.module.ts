import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/config/typeorm.config.service';
import { AuthModule } from './auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local'],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        AuthModule,
    ],
})
export class AppModule {}
