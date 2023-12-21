import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Quote } from 'src/quotes/entities/quote.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User, Quote, UserQuoteReaction])],    
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
