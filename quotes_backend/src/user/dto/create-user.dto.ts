import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength
  } from 'class-validator';
  
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
    @IsNotEmpty()
    password: string;
    
    created_at: Date;
  
    updated_at: Date;
  }
  