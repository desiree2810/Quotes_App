import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserQuoteReactionDto } from './dto/create-user-quote-reaction.dto';
import { UserQuoteReaction } from './entities/user-quote-reaction.entity';

@Injectable()
export class UserQuoteReactionService {

  constructor(
    @InjectRepository(UserQuoteReaction) private readonly userQuoteReactionRepository: Repository<UserQuoteReaction>, 

  ){}

  create(createUserQuoteReactionDto: CreateUserQuoteReactionDto) {
    let userquotereaction: UserQuoteReaction = new UserQuoteReaction();
    userquotereaction.like = CreateUserQuoteReactionDto.like;
    userquotereaction.dislike = CreateUserQuoteReactionDto.dislike;
    return this.userQuoteReactionRepository.save(userquotereaction);
  }

  
}
