import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findUserByEmail(email);

    // comparing password hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) return user;
    if (user == undefined)
      throw new UnauthorizedException('User Not Found : ' + email);
    if (user.password != password)
      throw new UnauthorizedException('Invalid Password');
  }
}
