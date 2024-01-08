import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/entities/quote.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { QuoteRepository } from 'src/quotes/quotes.repository';
import { UserQuoteReactionRepository } from 'src/user-quote-reaction/user-quote-reaction-repository';

@Injectable()
export class UserService {

  constructor( 
    private readonly userRepository: UserRepository,
    @InjectRepository(Quote) private readonly QuoteRepository: QuoteRepository,
    @InjectRepository(UserQuoteReaction) private readonly UserQuoteReactionRepository: UserQuoteReactionRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const user: User = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.created_at = createUserDto.created_at;
    user.updated_at = createUserDto.updated_at;
    console.log('user.service= ', user);
    return await this.userRepository.createUser(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  // not being used should we remove this?
  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneUser(id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findEmailOfUser(email);
  }

  // not being used should we remove this?
  findUserById(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.first_name = updateUserDto.first_name;
    user.last_name = updateUserDto.last_name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.created_at = updateUserDto.created_at;
    user.updated_at = updateUserDto.updated_at;
    user.id = id;
    return this.userRepository.updateUser(id,user);
  }

  async softDeleteUser(id: string) {
    const user = await this.userRepository.findOne({where: { id },});

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.isActive = false;
    await this.userRepository.update(id, user);
    return await this.userRepository.softDeleteUser(id,user);
  }

  // Fetch quotes added by the user
  async fetchAllQuotesByUser(id: string): Promise<Quote[]> {
    const ALlQuotes = await this.QuoteRepository.find({
      where: { userId: id },
      select: ['quote'],
    });
      return this.userRepository.fetchAllQuotesByUser(id,ALlQuotes)
  }

  //Fetches the quotes disliked by the user
  async fetchAllQuotesDislikedByUser(id: string) {
    const ALlDislikedQuotes = await this.UserQuoteReactionRepository.find({
      where: { userId: id, dislikes: true },
      relations: ['quote'],
    });

    return this.userRepository.fetchAllQuotesListDislikedByUser(id , ALlDislikedQuotes);
  }

  //Fetches the quotes liked by the user
  async fetchAllQuotesLikedByUser(id: string) {
    const ALLlikedQuotes = await this.UserQuoteReactionRepository.find({
      where: { userId: id, like: true },
      relations: ['quote'],
    });

    return this.userRepository.fetchAllQuotesListLikedByUser(id , ALLlikedQuotes);

  }
}
