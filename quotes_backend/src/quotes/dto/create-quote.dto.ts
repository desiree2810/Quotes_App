
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quote: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNumber()
  @IsOptional()
  like: number;

  @IsNumber()
  @IsOptional()
  dislikes: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tag: string;

  userId: string;
}
