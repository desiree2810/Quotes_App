import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/entities/quote.entity';
// import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  //inject user repository
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>, 
    @InjectRepository(Quote)
    private readonly QuoteRepository: Repository<Quote>,
    @InjectRepository(UserQuoteReaction)
    private readonly UserQuoteReactionRepository: Repository<UserQuoteReaction>
    ) 
    
    {}
    

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
        // quotes:true,
      }
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findUserByEmail(email : string){
    return this.userRepository.findOneOrFail({  where: { email: email }, } );
  }

  findUserById(id: string){
      return this.userRepository.findOne({ where : { id: id }});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
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

  async softDeleteUser(id: string) {
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
      // user,
    }
  }


  // Fetch quotes added by the user
async fetchAllQuotesByUser(id: string): Promise<Quote[]> {
  const ALlQuotes = await this.QuoteRepository.find({
    where: { userId: id },
    select: ['quote']
  });

  if (ALlQuotes.length === 0) {
    throw new NotFoundException(`No users found who liked the quote with ID #${id}`);
  }
  return ALlQuotes

  // return ALlQuotes.map((ALlQuote) => ALlQuotes.quote);
}


//Fetches the quotes disliked by the user
async fetchAllQuotesDilikedByUser(id: string) {
  const ALlDislikedQuotes = await this.UserQuoteReactionRepository.find({
    where: { userId: id, dislikes :true },
    relations: ['quote']
  });
  

  if (ALlDislikedQuotes.length === 0) {
    throw new NotFoundException(`No users found who disliked the quote with ID #${id}`);
  }
  // return ALlDislikedQuotes

  return ALlDislikedQuotes.map((ALlDislikedQuote) => ALlDislikedQuote.quote.quote);
}


//Fetches the quotes liked by the user
async fetchAllQuotesLikedByUser(id: string) {
  const ALLlikedQuotes = await this.UserQuoteReactionRepository.find({
    where: { userId: id, like :true },
    relations: ['quote']
  });
  

  if (ALLlikedQuotes.length === 0) {
    throw new NotFoundException(`No users found who liked the quote with ID #${id}`);
  }
  // return ALLlikedQuotes

  return ALLlikedQuotes.map((ALLlikedQuote) => ALLlikedQuote.quote.quote);
}




}
