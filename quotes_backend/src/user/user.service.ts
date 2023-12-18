import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/quotes/entities/quote.entity';
// import { FavouriteQuote } from 'src/favourite_quote/entities/favourite_quote.entity';
// import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  //inject user repository
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, 
    // @InjectRepository(Quote) private readonly quoteRepository: Repository<Quote>, 
    // @InjectRepository(Quote) private readonly fav_quoteRepository: Repository<FavouriteQuote>, 
    ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    // user.role = createUserDto.role;
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

  remove(id: number) {
    return this.userRepository.delete(id);
  }


// // to implement /users/{id}/quotes-------------- Fetch quotes added by the user   (done)
// async findQuotesByUserId(userId: number): Promise<Quote[]> {
//   const quotes = await this.quoteRepository.find({
//     where: {
//       user: { id: userId }, 
//     },
//   });
//   return quotes;
// }

// //to get liked and disliked quotes of a user
// async findFavouriteQuotesByUserId(userId: number) {
//   const favouriteQuotes = await this.fav_quoteRepository.find({
//     where: {
//       userId: userId,
//       like: true,
//     },
//     relations: ['quote'],
//   });

//   return favouriteQuotes.map(favQuote => favQuote.quote);
// }


// async findFavouriteQuotesByUserId(userId: number): Promise<FavouriteQuote[]> {
//   const favouriteQuotes = await this.fav_quoteRepository.find({
//     where: {
//       user: { id: userId },
//       like: true,
//     },
//   });
//   return favouriteQuotes;
// }

// async findFavouriteQuotesByUserId(userId: number): Promise<Quote[]> {
//   const favouriteQuotes = await this.fav_quoteRepository.find({
//     where: {
//       userId: userId,
//       like: true,
//     },
//     relations: ['quote'],
//   });

//   return favouriteQuotes.map(favQuote => favQuote.quote);
// }


// async findFavouriteQuotesByUserId(userId: number): Promise<Quote[]> {
//   const favouriteQuotes = await this.fav_quoteRepository.find({
//     where: {
//       userId: userId,
//       like: true,
//     },
//     relations: ['quote'],
//   });

//   return favouriteQuotes.map(favQuote => favQuote.quote);
// }


}
