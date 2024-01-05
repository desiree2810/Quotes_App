import { Controller } from '@nestjs/common';
import { UserQuoteReactionService } from './user-quote-reaction.service';

@Controller('user-quote-reaction')
export class UserQuoteReactionController {
  constructor(
    private readonly userQuoteReactionService: UserQuoteReactionService,
  ) {}
}
