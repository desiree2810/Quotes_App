import { IsBoolean, IsOptional } from 'class-validator';

export class CreateUserQuoteReactionDto {
  @IsBoolean()
  @IsOptional()
  like: boolean;

  @IsBoolean()
  @IsOptional()
  dislike: boolean;

  quoteId: string;

  userId: string;
  static like: boolean;
  static dislike: boolean;
}
