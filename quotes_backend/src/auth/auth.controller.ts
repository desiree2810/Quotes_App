import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post('/sign-in')
  @ApiResponse({ status: 201, description: 'User has been successfully Loggedin.'})
  @UseGuards(AuthGuard('local'))
  login(@Req() req , @Body() loginDto : LoginDto) {
    //jwt token
    const user: User = req.user;
    const payload = {
      userId: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    return { token: this.jwtService.sign(payload) };
  }

  @Post('/sign-up')
  @ApiResponse({ status: 201, description: 'User has been successfully created.'})
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    console.log(existingUser);
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    return await this.userService.create(createUserDto);
  }
}
