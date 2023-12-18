import { Controller, Post, Req, UseGuards, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Controller("auth")
export class AuthController {


  constructor(private jwtService : JwtService){

  }

  @Post("/login")
  @UseGuards(AuthGuard("local"))
  login(@Req() req) {
    //jwt token
    const user : User = req.user ;
    const payload = {
        userId : user.id,
        first_name : user.first_name,
        last_name  : user.last_name,
        email : user.email,
        // role : user.role,
    };

    return {token : this.jwtService.sign(payload)};
  }

}