import { DataSource, Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteRepository extends Repository<Quote> {
  constructor(private dataSource: DataSource) {
    super(Quote, dataSource.createEntityManager());
  }

  async createQuote(quote: Quote) {
    const saveQuote = this.save(quote);
    return saveQuote;
  }

  async findAllQuotes(filter,whereClause) {
    if (!filter) {
      return await this.find();
    }else{
      return this.find({where: whereClause,});
    }
  }

  async findQuoteById(id: string) {
    return await this.findOne({ where: { id } });
  }

  async updateQuote(id: string, quote: Quote) {
    return await this.update(id, quote);
  }

  async removeQuote(id: string) {
    return { message:  `Quote with ID ${id} deleted successfully` }
  }

  async getAllAuthorsList(authors){
    return authors.map((entry) => entry.author);
  }

  async getAllQuotesByAuthor(quotes){
    return quotes;
  }

  async getAllQuotesByTag(tags){
    return tags.map((entry) => entry.tag);
  }

}
