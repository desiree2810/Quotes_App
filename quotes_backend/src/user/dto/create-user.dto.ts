import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
import { Unique } from 'typeorm';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;
  
    @IsString()
    @IsNotEmpty()
    last_name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(4)
    // @MaxLength(10)
    @IsNotEmpty()
    password: string;
  
    // @IsString()
    // @IsNotEmpty()
    // role: string;
  
    created_at: Date;
  
    updated_at: Date;
  }
  