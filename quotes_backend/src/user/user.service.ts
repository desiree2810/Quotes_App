import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
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
  //inject user repository
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Quote)
    private readonly QuoteRepository: QuoteRepository,
    @InjectRepository(UserQuoteReaction)
    private readonly UserQuoteReactionRepository: UserQuoteReactionRepository,
    
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    let user: User = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;

    // hashing the password
    user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.created_at = createUserDto.created_at;
    user.updated_at = createUserDto.updated_at;
    return this.userRepository.save(user);
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   return this.userRepository.createUser(createUserDto);
  // }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {},
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  findUserById(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
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

    return {
      message: `User with ID ${id} is now inactive.`,
    };
  }

  // Fetch quotes added by the user
  async fetchAllQuotesByUser(id: string): Promise<Quote[]> {
    const ALlQuotes = await this.QuoteRepository.find({
      where: { userId: id },
      select: ['quote'],
    });

    if (ALlQuotes.length === 0) {
      throw new NotFoundException(
        `No users found who liked the quote with ID #${id}`,
      );
    }
    return ALlQuotes;
  }

  //Fetches the quotes disliked by the user
  async fetchAllQuotesDislikedByUser(id: string) {
    const ALlDislikedQuotes = await this.UserQuoteReactionRepository.find({
      where: { userId: id, dislikes: true },
      relations: ['quote'],
    });

    if (ALlDislikedQuotes.length === 0) {
      throw new NotFoundException(
        `No users found who disliked the quote with ID #${id}`,
      );
    }

    return ALlDislikedQuotes.map((ALlDislikedQuote) => ALlDislikedQuote.quote);
  }

  //Fetches the quotes liked by the user
  async fetchAllQuotesLikedByUser(id: string) {
    const ALLlikedQuotes = await this.UserQuoteReactionRepository.find({
      where: { userId: id, like: true },
      relations: ['quote'],
    });

    if (ALLlikedQuotes.length === 0) {
      throw new NotFoundException(
        `No users found who liked the quote with ID #${id}`,
      );
    }

    return ALLlikedQuotes.map((ALLlikedQuote) => ALLlikedQuote.quote);
  }
}
