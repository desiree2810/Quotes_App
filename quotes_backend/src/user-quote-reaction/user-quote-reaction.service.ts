import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserQuoteReactionDto } from './dto/create-user-quote-reaction.dto';
import { UserQuoteReaction } from './entities/user-quote-reaction.entity';
import { UserQuoteReactionRepository } from './user-quote-reaction-repository';

@Injectable()
export class UserQuoteReactionService {

  constructor(
    @InjectRepository(UserQuoteReaction) 
    private readonly userQuoteReactionRepository: UserQuoteReactionRepository, 

  ){}

  create(createUserQuoteReactionDto: CreateUserQuoteReactionDto) {
    let userquotereaction: UserQuoteReaction = new UserQuoteReaction();
    userquotereaction.like = createUserQuoteReactionDto.like;
    userquotereaction.dislikes = createUserQuoteReactionDto.dislike;
    return this.userQuoteReactionRepository.save(userquotereaction);
  }

  
}
