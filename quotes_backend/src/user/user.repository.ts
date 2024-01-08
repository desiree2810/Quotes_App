import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

// @Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    // async createUser(createUserDto: CreateUserDto): Promise<User> {
    //     const saltOrRounds = 10;
    //     const user: User = new User();
    //     user.first_name = createUserDto.first_name;
    //     user.last_name = createUserDto.last_name;
    //     user.email = createUserDto.email;
    //     user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    //     user.created_at = createUserDto.created_at;
    //     user.updated_at = createUserDto.updated_at;
    //     return this.save(user);
    //   }
    
    
    //aarti
    // async createUser(user){

    //    return this.save(user);
    // }

    // async findinguser(id){
    //     return await this.findOne({
    //         where: { id },
    //       });
    // }
    // async findinguseremail(email){
    //     // console.log(email)
    //     const newvar = this.findOne({ where: { email: email } });
    //     // console.log(newvar)
    //     return await newvar;
    // }

    
}
