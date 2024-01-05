import { Module } from '@nestjs/common';
import { UserQuoteReactionService } from './user-quote-reaction.service';
import { UserQuoteReactionController } from './user-quote-reaction.controller';
import { UserQuoteReaction } from './entities/user-quote-reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([UserQuoteReaction])],
  controllers: [UserQuoteReactionController],
  providers: [UserQuoteReactionService],
})
export class UserQuoteReactionModule {}
