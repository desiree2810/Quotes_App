import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserQuoteReactionModule } from './user-quote-reaction/user-quote-reaction.module';
import { dataSourceOptions } from 'db/data-source';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        await dataSourceOptions(configService),
        inject: [ConfigService],
    }),

    QuotesModule,
    UserModule,
    AuthModule,
    UserQuoteReactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
