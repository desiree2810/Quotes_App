import { Injectable } from '@nestjs/common';
import { CreateUserQuoteReactionDto } from './dto/create-user-quote-reaction.dto';
import { UserQuoteReaction } from './entities/user-quote-reaction.entity';
import { UserQuoteReactionRepository } from './user-quote-reaction-repository';

@Injectable()
export class UserQuoteReactionService {

  constructor(
    private readonly userQuoteReactionRepository: UserQuoteReactionRepository, 

  ){}

  async create(createUserQuoteReactionDto: CreateUserQuoteReactionDto) {
    const userquotereaction: UserQuoteReaction = new UserQuoteReaction();
    userquotereaction.like = createUserQuoteReactionDto.like;
    userquotereaction.dislikes = createUserQuoteReactionDto.dislike;
    return await this.userQuoteReactionRepository.createUserReaction(userquotereaction);
  }

  
}
