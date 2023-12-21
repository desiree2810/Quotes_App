import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId; ///to get userID
    console.log(userId);
    return this.userService.update(userId, updateUserDto);
  }

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
