import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  //to get all authors
  @Get('authors')
  getAllAuthors() {
    return this.quotesService.getAllAuthors();
  }

  //to get quotes by authorname
  @Get('authors/:author')
  getQuotesByAuthor(@Param('author') author: string) {
    return this.quotesService.getAllQuotesByAuthor(author);
  }


  // to get tags from quotes
  @Get('quotes/tags')
  getAllTagsByQuote() {
    return this.quotesService.getAllTagsByQuote();
  }
  
  
  @Post('quotes')
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  // @Get('quotes')
  // findAll() {
  //   return this.quotesService.findAll();
  // }

  @Get('quotes')
  findAll(@Query('quote') quote?: string, @Query('author') author?: string) {
    return this.quotesService.findAll({ quote, author });
  }

  
  @Get('quotes/:id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(+id);
  }

  @Patch('quotes/:id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(+id, updateQuoteDto);
  }

  @Delete('quotes/:id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }






}
