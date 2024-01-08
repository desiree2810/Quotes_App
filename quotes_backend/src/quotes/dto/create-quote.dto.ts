
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsString()
  quote: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNumber()
  @IsOptional()
  like: number;

  @IsNumber()
  @IsOptional()
  dislikes: number;

  @IsNotEmpty()
  @IsString()
  tag: string;

  userId: string;
}
