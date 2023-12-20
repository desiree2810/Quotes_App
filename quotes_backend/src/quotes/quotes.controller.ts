import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  // to get tags from quotes
  
  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }
  
  @Get('tags')
  getAllTagsByQuote() {
    return this.quotesService.getAllTagsByQuote();
  }

  @Get()
  findAll( @Query('author') author?: string) {
    return this.quotesService.findAll({ author });
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }


@Patch(':id/like/up')
  async likeQuote(
    @Param('id') id: number, 
    @Query('userId') userId:number
  ) {
    try {
      await this.quotesService.likeQuote(id, userId);
      return { message: 'Quote liked successfully' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }


  @Patch(':id/dislike/up')
  async dislikeQuote(
    @Param('id') id: number, 
    @Query('userId') userId:number
  ) {
    try {
      await this.quotesService.dislikeQuote(id, userId);
      return { message: 'Quote disliked successfully' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }


@Patch(':id/like/down')
  async remove_likeQuote(
    @Param('id') id: number, 
    @Query('userId') userId:number
  ) {
    try {
      await this.quotesService.remove_likeQuote(id, userId);
      return { message: 'Quote liked decremented' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }


  @Patch(':id/dislike/down')
  async remove_dislikeQuote(
    @Param('id') id: number, 
    @Query('userId') userId:number
  ) {
    try {
      await this.quotesService.remove_dislikeQuote(id, userId);
      return { message: 'Quote disliked decremented' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }



  
}