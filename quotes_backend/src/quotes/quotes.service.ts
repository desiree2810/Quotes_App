import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
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
findAll(filter?: { quote?: string, author?: string }): Promise<Quote[]> {
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



  async findOne(@Param('id') id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Quote with ID #${id} not found`);
    }
    return quote;
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.findOne(id);
    if (!quote) {
      throw new NotFoundException(`Quote #${id} not found`);
    }

    Object.assign(quote, updateQuoteDto);
    return await this.quoteRepository.save(quote);
  }

  async remove(id: number) {
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

}
