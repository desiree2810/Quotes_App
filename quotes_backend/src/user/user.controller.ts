import { Controller, Get, Post, Body, Patch, Param, Delete,Req,  ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signUp")
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

//   @Get(':id/quotes')
//   findQuotesByUserId(@Param('id') id: string) {
//   console.log(" -------------userid--------------->",id);
//   return this.userService.findQuotesByUserId(+id);
// }
  

// @Get(':id/favourite-quotes')
// findFavouriteQuotesByUserId(@Param('id') id: string) {
//   return this.userService.findFavouriteQuotesByUserId(+id);
// }
}
