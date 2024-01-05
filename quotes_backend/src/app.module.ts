import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserQuoteReactionModule } from './user-quote-reaction/user-quote-reaction.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.local.env' }),

    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        await dataSourceOptions(configService),
        inject: [ConfigService],
    }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule.forRoot({
    //     isGlobal : true,
    //     envFilePath : ".local.env",
    //     // envFilePath : ".prod.env",
    //   })],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: +configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_DATABASE'),
    //     synchronize: configService.get<boolean>('DB_SYNC'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}']
    //   }),
    //   inject: [ConfigService],
    // }),

    QuotesModule,
    UserModule,
    AuthModule,
    UserQuoteReactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
