import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserQuoteReactionService } from './user-quote-reaction.service';
import { CreateUserQuoteReactionDto } from './dto/create-user-quote-reaction.dto';
import { UpdateUserQuoteReactionDto } from './dto/update-user-quote-reaction.dto';

@Controller('user-quote-reaction')
export class UserQuoteReactionController {
  constructor(private readonly userQuoteReactionService: UserQuoteReactionService) {}

 
}
