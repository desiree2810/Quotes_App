import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
// import { UserQuoteReaction } from './entities/user-quote-reaction.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(UserQuoteReaction)
    private readonly userQuoteReactionRepository: Repository<UserQuoteReaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) {}

  async create(@Body() createQuoteDto: CreateQuoteDto) {
    const quote = this.quoteRepository.create({
      quote: createQuoteDto.quote,
      author: createQuoteDto.author,
      like: createQuoteDto.like,
      dislikes: createQuoteDto.dislikes,
      tag: createQuoteDto.tag,
      userId: createQuoteDto.userId,
    });
    console.log(quote)
  
    return await this.quoteRepository.save(quote);
  }
  

  // async findAll() {
  //   return await this.quoteRepository.find({
  //     relations: {
  //       // user: true,
  //     },
  //   });
  // }


  // find all quotes by author using Query Parameters
findAll(filter?: { author?: string }): Promise<Quote[]> {
  if (!filter) {
    return this.quoteRepository.find();
  }

  const whereClause: any = {};

  // if (filter.quote) {
  //   whereClause.quote = filter.quote;
  // }

  if (filter.author) {
    whereClause.author = filter.author;
  }

  console.log("quote =", whereClause)

  return this.quoteRepository.find({
    where: whereClause,
  });
}



  async findOne(@Param('id') id: string): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Quote with ID #${id} not found`);
    }
    return quote;
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.findOne(id);
    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }

    Object.assign(quote, updateQuoteDto);
    return await this.quoteRepository.save(quote);
  }

  async remove(id: string) {
    const quote = await this.findOne(id);
    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }
    return this.quoteRepository.remove(quote);
  }

  // fetch all authors from quote
  async getAllAuthors(): Promise<string[]> {
    const authors = await this.quoteRepository
      .createQueryBuilder('quote')
      .select('DISTINCT author')
      .getRawMany();

      console.log(authors);

    return authors.map((entry) => entry.author);
  }

    // fetch all quotes by authername
  async getAllQuotesByAuthor(author: string): Promise<Quote[]> {
    const quotes = await this.quoteRepository
      .createQueryBuilder('quote')
      .where('quote.author = :author', { author : author })
      .getMany();

      console.log(quotes);

    return quotes;
}

// fetch tags from quote
async getAllTagsByQuote() {
  const tags = await this.quoteRepository
    .createQueryBuilder('quote')
    .select('DISTINCT tag')
    .getRawMany();

    console.log(tags);

  return tags.map((entry) => entry.tag);

}

//increment count by 1 for liked quote
async likeQuote(id: string, user_id:string){
  await this.updatelikeReactionCount(id, 'like' , 1, user_id);
}

private async updatelikeReactionCount(id: string, reactionType:string, increment: number, userId:string) {
  const quote = await this.quoteRepository.findOne({where:{id:id}});
  
  if (!quote) {
    throw new NotFoundException(`Quote with ID ${id} not found`);
  }
  
  // quote[reactionType] += increment;
  
  // await this.quoteRepository.update(id, quote);
  
    const userQuoteReaction = this.userQuoteReactionRepository.create({
    like: reactionType === 'like' ? true : false,
    dislikes: reactionType === 'dislikes' ? true : false,
    quoteId: id,
    userId: userId , 
  });

  await this.userQuoteReactionRepository.save(userQuoteReaction);
}


//increment count by 1 for disliked quote
async dislikeQuote(id: string, user_id:string){
  await this.updatedislikeReactionCount(id, 'dislikes' , 1, user_id);
}

private async updatedislikeReactionCount(id: string, reactionType:string, increment: number, userId:string) {
  const quote = await this.quoteRepository.findOne({where:{id:id}});

  if (!quote) {
    throw new NotFoundException(`Quote with ID ${id} not found`);
  }

  // quote[reactionType] += increment;

  // await this.quoteRepository.update(id, quote);
  
  const userQuoteReaction = this.userQuoteReactionRepository.create({
    like: reactionType === 'like' ? true : false,
    dislikes: reactionType === 'dislikes' ? true : false,
    quoteId: id,
    userId: userId, 
  });

  await this.userQuoteReactionRepository.save(userQuoteReaction);
}

//decrement count by 1 for liked quote
async remove_likeQuote(id: string, user_id:string){
  await this.updateremove_likeReactionCount(id, 'like' , 1, user_id);
}

private async updateremove_likeReactionCount(id: string, reactionType:string, decrement: number, userId:string) {
  const quote = await this.quoteRepository.findOne({where:{id:id}});
  
  if (!quote) {
    throw new NotFoundException(`Quote with ID ${id} not found`);
  }
  
  quote[reactionType] -= decrement;
  
  await this.quoteRepository.update(id, quote);

    // to del likes
    await this.userQuoteReactionRepository.delete({
      quoteId: id,
      userId: userId,
      like: true,
      dislikes: false
    });

}


//decrement count by 1 for disliked quote
async remove_dislikeQuote(id: string, user_id:string){
  await this.updateremove_dislikeReactionCount(id, 'dislikes' , 1, user_id);
}

private async updateremove_dislikeReactionCount(id: string, reactionType:string, decrement: number, userId:string) {
  const quote = await this.quoteRepository.findOne({where:{id:id}});
  
  if (!quote) {
    throw new NotFoundException(`Quote with ID ${id} not found`);
  }
  
  quote[reactionType] -= decrement;
  
  await this.quoteRepository.update(id, quote);


  // to del dislikes
  await this.userQuoteReactionRepository.delete({
    quoteId: id,
    userId: userId,
    like:false,
    dislikes: true
  });

}

// get all users who liked a single quote
async getAllLikedUsers(id: string): Promise<User[]> {
  const likedUsers = await this.userQuoteReactionRepository.find({
    where: { quoteId: id, like: true },
    relations: ['user'],
  });

  if (likedUsers.length === 0) {
    throw new NotFoundException(`No users found who liked the quote with ID #${id}`);
  }

  return likedUsers.map((userReaction) => userReaction.user);
}

// get all users who disliked a single quote
async getAllDislikedUsers(id: string): Promise<User[]> {
  const dislikedUsers = await this.userQuoteReactionRepository.find({
    where: { quoteId: id, dislikes: true },
    relations: ['user'],
  });

  if (dislikedUsers.length === 0) {
    throw new NotFoundException(`No users found who liked the quote with ID #${id}`);
  }

  return dislikedUsers.map((userReaction) => userReaction.user);
}


}
