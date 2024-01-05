import { PartialType } from '@nestjs/mapped-types';
import { CreateUserQuoteReactionDto } from './create-user-quote-reaction.dto';

export class UpdateUserQuoteReactionDto extends PartialType(
  CreateUserQuoteReactionDto,
) {}
