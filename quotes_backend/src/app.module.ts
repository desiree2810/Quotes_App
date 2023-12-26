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
import { APP_GUARD} from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal : true,
        envFilePath : ".local.env",
        // envFilePath : ".prod.env",
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [__dirname + '/**/*.entity{.ts,.js}']
      }),
      inject: [ConfigService],
    }),

    QuotesModule,
    UserModule,
    AuthModule,
    UserQuoteReactionModule,
    ThrottlerModule.forRoot([
      {
        name: 'quotesAccess', 
        ttl: 86400000, // 24 hours in milliseconds   86400000
        limit: 2, // 10 requests per 24 hours        10
      },
    ])

  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
