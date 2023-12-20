import { IsBoolean } from 'class-validator';

export class CreateUserQuoteReactionDto {
    
    // @IsBoolean()
    like: boolean;

    // @IsBoolean()
    dislike: boolean;

    quoteId: number;

    userId: number
  static like: boolean;
  static dislike: boolean;
}
