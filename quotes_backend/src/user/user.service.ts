import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/entities/quote.entity';
// import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  //inject user repository
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, 
 
    ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.created_at = createUserDto.created_at;
    user.updated_at = createUserDto.updated_at;
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations:{
        quotes:true,
      }
    });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findUserByEmail(email : string){
    return this.userRepository.findOneOrFail({  where: { email: email }, } );
  }

  findUserById(id: number){
      return this.userRepository.findOne({ where : { id: id }});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.first_name = updateUserDto.first_name;
    user.last_name = updateUserDto.last_name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.created_at = updateUserDto.created_at;
    user.updated_at = updateUserDto.updated_at;
    user.id = id;
    return this.userRepository.save(user);
  }

  async softDeleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.isActive = false;

    await this.userRepository.update(id, user);

    return{
      message: `User with ID ${id} is now inactive.`,
      user,
    }
  }




}
