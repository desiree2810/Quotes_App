import {
  Body,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { UserQuoteReaction } from 'src/user-quote-reaction/entities/user-quote-reaction.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository, ILike, Like } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';
import { QuoteRepository } from './quotes.repository';
import { UserQuoteReactionRepository } from 'src/user-quote-reaction/user-quote-reaction-repository';

@Injectable()
export class QuotesService {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    @InjectRepository(UserQuoteReaction)
    private readonly userQuoteReactionRepository: UserQuoteReactionRepository,
    private readonly userService: UserService,
  ) {}

  create(@Body() createQuoteDto: CreateQuoteDto, id: any) {
    let likecount = 0;
    let dislikecount = 0;

    const quote = this.quoteRepository.create({
      quote: createQuoteDto.quote,
      author: createQuoteDto.author,
      like: likecount,
      dislikes: dislikecount,
      tag: createQuoteDto.tag,
      userId: id,
    });

    return this.quoteRepository.createQuote(quote);
  }

  async findAll(filter?: {
    author?: string;
    tag?: string;
    quote?: string;
  }): Promise<Quote[]> {
    const whereClause: any = {};

    if (!filter) {
      return this.quoteRepository.findAllQuotes(filter, whereClause);
    }


    if (filter.author) {
      whereClause.author = ILike(`%${filter.author}%`);
    }
    if (filter.tag) {
      // Split tags by spaces and create conditions for each partial tag
      const tagsArray = filter.tag.split(' ').filter(tag => tag.trim() !== '');

      // Sort the tags to make the order not matter
      const sortedTagsArray = tagsArray.sort();

      // Use the Like operator to match each partial tag
      whereClause.tag = Like(`%${sortedTagsArray.join('%')}%`);
    }

    if (filter.quote) {
      whereClause.quote = ILike(`%${filter.quote}%`);
    }
    return this.quoteRepository.findAllQuotes(filter, whereClause);
  }

  async findOne(@Param('id') id: string): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Quote with ID #${id} not found`);
    }
    return this.quoteRepository.findQuoteById(id)
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.findOne(id);
    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }

    Object.assign(quote, updateQuoteDto);
    return await this.quoteRepository.updateQuote(id,quote);
  }

  async remove(id: string) {
    const quote = await this.findOne(id);
    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }
    await this.userQuoteReactionRepository.delete({ quoteId: id }); //delete from userQuoteReactionRepository first
    await this.quoteRepository.remove(quote); //then delete from quoteRepository
    return this.quoteRepository.removeQuote(id);
  }

  // fetch all authors from quote
  async getAllAuthors(): Promise<string[]> {
    const authors = await this.quoteRepository
      .createQueryBuilder('quote')
      .select('DISTINCT author')
      .getRawMany();

    console.log(authors);
    return this.quoteRepository.getAllAuthorsList(authors)
  }

  // fetch all quotes by authername
  async getAllQuotesByAuthor(author: string): Promise<Quote[]> {
    const quotes = await this.quoteRepository
      .createQueryBuilder('quote')
      .where('quote.author = :author', { author: author })
      .getMany();

    return this.quoteRepository.getAllQuotesByAuthor(quotes);
  }

  // fetch tags from quote
  async getAllTagsByQuote() {
    const tags = await this.quoteRepository
      .createQueryBuilder('quote')
      .select('DISTINCT tag')
      .getRawMany();

    return this.quoteRepository.getAllQuotesByTag(tags);
  }

  //increment count by 1 for liked quote
  async likeQuote(id: string, user_id: string) {
    const existingLike = await this.userQuoteReactionRepository.findOne({
      where: { quoteId: id, userId: user_id, like: true },
    });

    if (existingLike) {
      throw new Error(
        `User ${user_id} has already liked the quote with ID ${id}`,
      );
    }

    await this.updatelikeReactionCount(id, 'like', 1, user_id);
  }

  private async updatelikeReactionCount(
    id: string,
    reactionType: string,
    increment: number,
    userId: string,
  ) {
    const quote = this.quoteRepository.findQuoteById(id)

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    const userQuoteReaction = this.userQuoteReactionRepository.create({
      like: reactionType === 'like' ? true : false,
      dislikes: reactionType === 'dislikes' ? true : false,
      quoteId: id,
      userId: userId,
    });

    await this.userQuoteReactionRepository.save(userQuoteReaction);
  }

  //increment count by 1 for disliked quote
  async dislikeQuote(id: string, user_id: string) {
    // Check if the user has already liked the quote
    const existingLike = await this.userQuoteReactionRepository.findOne({
      where: { quoteId: id, userId: user_id, like: true },
    });

    if (existingLike) {
      throw new Error(
        `User ${user_id} has already reacted to the quote with ID ${id} (only one reaction can be performed per quote)`,
      );
    } else {
      // check if dislike exists
      const existingDislike = await this.userQuoteReactionRepository.findOne({
        where: { quoteId: id, userId: user_id, dislikes: true },
      });

      if (existingDislike) {
        throw new Error(
          `User ${user_id} has already disliked the quote with ID ${id}`,
        );
      }
      // if dislike doesnt exist then proceed further
      await this.updatedislikeReactionCount(id, 'dislikes', 1, user_id);
    }
  }

  private async updatedislikeReactionCount(
    id: string,
    reactionType: string,
    increment: number,
    userId: string,
  ) {
    const quote = this.quoteRepository.findQuoteById(id)

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    const userQuoteReaction = this.userQuoteReactionRepository.create({
      like: reactionType === 'like' ? true : false,
      dislikes: reactionType === 'dislikes' ? true : false,
      quoteId: id,
      userId: userId,
    });

    await this.userQuoteReactionRepository.save(userQuoteReaction);
  }

  //decrement count by 1 for liked quote
  async remove_likeQuote(id: string, user_id: string) {
    await this.updateremove_likeReactionCount(id, 'like', 1, user_id);
  }

  private async updateremove_likeReactionCount(
    id: string,
    reactionType: string,
    decrement: number,
    userId: string,
  ) {
    const quote = this.quoteRepository.findQuoteById(id)

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    // to del likes
    await this.userQuoteReactionRepository.delete({
      quoteId: id,
      userId: userId,
      like: true,
      dislikes: false,
    });
  }

  //decrement count by 1 for disliked quote
  async remove_dislikeQuote(id: string, user_id: string) {
    await this.updateremove_dislikeReactionCount(id, 'dislikes', 1, user_id);
  }

  private async updateremove_dislikeReactionCount(
    id: string,
    reactionType: string,
    decrement: number,
    userId: string,
  ) {
    const quote = this.quoteRepository.findQuoteById(id);

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    // to del dislikes
    await this.userQuoteReactionRepository.delete({
      quoteId: id,
      userId: userId,
      like: false,
      dislikes: true,
    });
  }

  // get all users who liked a single quote
  async getAllLikedUsers(id: string): Promise<User[]> {
    const likedUsers = await this.userQuoteReactionRepository.find({
      where: { quoteId: id, like: true },
      relations: ['user'],
    });

    if (likedUsers.length === 0) {
      throw new NotFoundException(
        `No users found who liked the quote with ID #${id}`,
      );
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
      throw new NotFoundException(
        `No users found who liked the quote with ID #${id}`,
      );
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

      // eachQuote.like = likedCount;
      // eachQuote.dislikes = dislikedCount;

      await this.quoteRepository.save(eachQuote);
    }
  }
}
