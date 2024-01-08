
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength
  } from 'class-validator';
  import { ApiProperty} from '@nestjs/swagger';
  
  export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_name: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    last_name: string;
  
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    password: string;
    
    created_at: Date;
  
    updated_at: Date;
  }
  