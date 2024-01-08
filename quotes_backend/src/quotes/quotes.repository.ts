import { EntityRepository, Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';

@EntityRepository(Quote)
export class QuoteRepository extends Repository<Quote> {


    async createQuote(createQuoteDto: CreateQuoteDto, userId: string): Promise<Quote> {
        let likecount = 0;
        let dislikecount = 0;
    
        const quote = this.create({
          quote: createQuoteDto.quote,
          author: createQuoteDto.author,
          like: likecount,
          dislikes: dislikecount,
          tag: createQuoteDto.tag,
          userId: userId,
        });
    
        return this.save(quote);
      }
    
}
