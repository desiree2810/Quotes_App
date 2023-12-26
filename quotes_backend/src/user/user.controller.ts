import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ValidationPipe,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @SkipThrottle()
  // @Post('/signUp')
  // create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @SkipThrottle()
  @Post('/signUp')
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(createUserDto.email);
    console.log(existingUser);
      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
  return await this.userService.create(createUserDto);
  }


  @SkipThrottle()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @SkipThrottle()
  @Patch()
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId; ///to get userID
    console.log(userId);
    return this.userService.update(userId, updateUserDto);
  }

  @SkipThrottle()
  @Delete(':id')
  softDeleteUser(@Param('id') id: string) {
    return this.userService.softDeleteUser(id);
  }

  // to fetch all quotes by userid
  @Get(':id/quotes')
  async fetchAllQuotesByUser(@Param('id') id: string) {
    try {
      const quotes = await this.userService.fetchAllQuotesByUser(id);
      return { quotes };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  //Fetches the quotes disliked by the user
  @Get(':id/unfavourite-quotes')
  async fetchAllQuotesDislikedByUser(@Param('id') id: string) {
    try {
      const quotes = await this.userService.fetchAllQuotesDislikedByUser(id);
      return { quotes };
    } catch (error) {
      return { 
       error: error.message };
    }
  }

//Fetches the quotes liked by the user
@Get(':id/favourite-quotes')
async fetchAllQuotesLikedByUser(@Param('id') id: string) {
  try {
    const quotes = await this.userService.fetchAllQuotesLikedByUser(id);
    return { quotes };
  } catch (error) {
    return { 
     error: error.message };
  }
}



}
