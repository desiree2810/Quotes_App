import { Body, Injectable, Logger, NotFoundException, Param } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository, ILike } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';


@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(UserQuoteReaction)
    private readonly userQuoteReactionRepository: Repository<UserQuoteReaction>,

    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly userService: UserService

  ) {}


  // logger TASK SHEDULER
  // private readonly logger = new Logger(QuotesService.name);

  // @Cron('* * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the 60 seconds elapses');
  // }

 
create(@Body() createQuoteDto: CreateQuoteDto, id:any){

  let likecount = 0;
  let dislikecount = 0;
  
  const quote = this.quoteRepository.create({
    quote: createQuoteDto.quote,
    author: createQuoteDto.author,
    like: likecount,
    dislikes:dislikecount,
    tag: createQuoteDto.tag,
    userId: id,
    // userId : id.userId
  });
  console.log(quote)

  return  this.quoteRepository.save(quote);
}
  

  // async findAll() {
  //   return await this.quoteRepository.find({
  //     relations: {
  //       // user: true,
  //     },
  //   });
  // }


  // find all quotes by author using Query Parameters
// findAll(filter?: { author?: string, tag?: string, quote?: string }): Promise<Quote[]> {
//   if (!filter) {
//     return this.quoteRepository.find();
//   }

//   const whereClause: any = {};

//   if (filter.author) {
//     whereClause.author = filter.author;
//   }
//   if (filter.tag){
//     whereClause.tag = filter.tag;
//   }
//   if(filter.quote){
//     whereClause.quote = filter.quote;
//   }
 
//   console.log("quote =", whereClause)

//   return this.quoteRepository.find({
//     where: whereClause,
//   });


// }
// async findAll(filter?: { author?: string; tag?: string; quote?: string }): Promise<Quote[]> {
//   if (!filter) {
//     return this.quoteRepository.find();
//   }

//   const whereClause: any = {};

//   if (filter.author) {
//     whereClause.author = filter.author;
//   }
//   if (filter.tag) {
//     whereClause.tag = filter.tag;
//   }
//   if (filter.quote) {
//     whereClause.quote = filter.quote;
//   }

//   return this.quoteRepository.find({
//     where: whereClause,
//   });
// }
async findAll(filter?: { author?: string; tag?: string; quote?: string }): Promise<Quote[]> {
  if (!filter) {
    return this.quoteRepository.find();
  }

  const whereClause: any = {};

  if (filter.author) {
    whereClause.author = ILike(`%${filter.author}%`)
  }
  if (filter.tag) {
    whereClause.tag = ILike(`%${filter.tag}%`)
  }
  if (filter.quote) {
    whereClause.quote = ILike(`%${filter.quote}%`)
  }

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

  // async remove(id: string) {
  //   const quote = await this.findOne(id);
  //   if (!quote) {
  //     throw new NotFoundException(`Quote #${id} not found`);
  //   }
  //   this.quoteRepository.remove(quote);
  //   return `Quote with ID ${id} deleted successfully`
  // }

  async remove(id: string) {
    const quote = await this.findOne(id);
    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }

    await this.userQuoteReactionRepository.delete({ quoteId: id }); //delete from userQuoteReactionRepository first
    await this.quoteRepository.remove(quote);   //then delete from quoteRepository 
    return `Quote with ID ${id} deleted successfully`
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

  // check if like exists
    const existingLike = await this.userQuoteReactionRepository.findOne({
      where: { quoteId: id, userId: user_id, like: true },
    });
  
    if (existingLike) {
      throw new Error(`User ${user_id} has already liked the quote with ID ${id}`);
    }

    // if like doesnt exist then proceed further
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
//increment count by 1 for disliked quote
async dislikeQuote(id: string, user_id:string){

  // Check if the user has already liked the quote
  const existingLike = await this.userQuoteReactionRepository.findOne({
   where: { quoteId: id, userId: user_id, like: true  },
 });

 if (existingLike) {
   throw new Error(`User ${user_id} has already reacted to the quote with ID ${id} (only one reaction can be performed per quote)` );
 } else{
   // check if dislike exists
   const existingDislike = await this.userQuoteReactionRepository.findOne({
     where: { quoteId: id, userId: user_id, dislikes: true },
   });
 
   if (existingDislike) {
     throw new Error(`User ${user_id} has already disliked the quote with ID ${id}`);
   }
   // if dislike doesnt exist then proceed further
 await this.updatedislikeReactionCount(id, 'dislikes' , 1, user_id);
 }
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
  
  // quote[reactionType] -= decrement;
  
  // await this.quoteRepository.update(id, quote);

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
  
  // quote[reactionType] -= decrement;
  
  // await this.quoteRepository.update(id, quote);


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


// task scheduler to count the total number of likes and dislikes for a quote 
@Cron(CronExpression.EVERY_30_SECONDS)
async countLikesAndDislikes(): Promise<void> {
  const quotes = await this.quoteRepository.find();

  for (const eachQuote of quotes) {
    const likedCount = await this.userQuoteReactionRepository.count({
      where: { quoteId: eachQuote.id, like: true },
    });
    
    const dislikedCount = await this.userQuoteReactionRepository.count({
      where: { quoteId: eachQuote.id, dislikes: true },
    });

    // to store all likes & dislikes of each quotebyId in quotes table (like & dislike column)
    eachQuote.like = likedCount;
    eachQuote.dislikes = dislikedCount;


    eachQuote.like = likedCount;
    eachQuote.dislikes = dislikedCount;

    // to display all likes & dislikes of each quotebyId
    // console.log(`likedCount for ${eachQuote.id} =`, likedCount)
    // console.log(`dislikedCount for ${eachQuote.id} =`, dislikedCount)
    // console.log()


    eachQuote.like = likedCount;
    eachQuote.dislikes = dislikedCount;
    // console.log("-----------------------", eachQuote.like)
    // console.log("-----------------------", eachQuote.dislikes)

    await this.quoteRepository.save(eachQuote);
}
}


}
