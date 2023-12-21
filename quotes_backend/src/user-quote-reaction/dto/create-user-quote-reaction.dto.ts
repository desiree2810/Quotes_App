import { IsBoolean } from 'class-validator';

export class CreateUserQuoteReactionDto {
    
    // @IsBoolean()
    like: boolean;

    // @IsBoolean()
    dislike: boolean;

    quoteId: string;

    userId: string
  static like: boolean;
  static dislike: boolean;
}
