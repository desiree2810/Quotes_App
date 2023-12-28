import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { User } from 'src/user/entities/user.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD} from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [TypeOrmModule.forFeature([Quote,UserQuoteReaction, User]), ScheduleModule.forRoot(), UserModule, ThrottlerModule.forRoot([
    {
      // name: 'quotesAccess', 
      ttl: 86400000, // 24 hours in milliseconds   86400000
      limit: 1000, // 10 requests per 24 hours        10
    },
  ])],
  controllers: [QuotesController],
  providers: [QuotesService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class QuotesModule {}
