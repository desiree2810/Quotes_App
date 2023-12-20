import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { User } from 'src/user/entities/user.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote,UserQuoteReaction, User])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
