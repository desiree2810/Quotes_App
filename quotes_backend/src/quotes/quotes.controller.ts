import { Controller, Get, Post, Body, Patch, Param,Request, Delete, Query, UseGuards} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  
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
    return this.quotesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }


//to extract the userid from the jwt token--> to like a quote using patch request
@Patch(':id/like/up')
async likeQuote( @Request() req: any , @Param('id') id: string) {

  // const userId = req.user.userId; 
  const userId = req.user.userId ;    ///to get userID
  console.log(userId)
  
  try {
    await this.quotesService.likeQuote(id, userId);
    return { message: 'Quote liked successfully' };
  } catch (error) {
    return { message: 'Error liking the quote', error: error.message };
  }
}


@Patch(':id/dislike/up')
async dislikeQuote( @Request() req: any , @Param('id') id: string) {

  // const userId = req.user.userId; 
  const userId = req.user.userId ;    ///to get userID
  console.log(userId)
  
  try {
    await this.quotesService.dislikeQuote(id, userId);
    return { message: 'Quote disliked successfully' };
  } catch (error) {
    return { message: 'Error liking the quote', error: error.message };
  }
}


@Patch(':id/like/down')
async remove_likeQuote( @Request() req: any , @Param('id') id: string) {

  // const userId = req.user.userId; 
  const userId = req.user.userId ;    ///to get userID
  console.log(userId)
  
  try {
    await this.quotesService.remove_likeQuote(id, userId);
      return { message: 'Quote liked decremented' };
  } catch (error) {
    return { message: 'Error liking the quote', error: error.message };
  }
}

@Patch(':id/dislike/down')
async remove_dislikeQuote( @Request() req: any , @Param('id') id: string) {

  // const userId = req.user.userId; 
  const userId = req.user.userId ;    ///to get userID
  console.log(userId)
  
  try {
    await this.quotesService.remove_dislikeQuote(id, userId);
      return { message: 'Quote disliked decremented' };
  } catch (error) {
    return { message: 'Error liking the quote', error: error.message };
  }
}

  // find all users who liked the quote
@Get(':id/like/users')
async getAllLikedUsers(@Param('id') id: string) {
  try {
    const users = await this.quotesService.getAllLikedUsers(id);
    return { users };
  } catch (error) {
    return { 
      // message: 'Error getting users who liked the quote',
     error: error.message };
  }
}

@Get(':id/dislike/users')
async getAllDislikedUsers(@Param('id') id: string) {
  try {
    const users = await this.quotesService.getAllDislikedUsers(id);
    return { users };
  } catch (error) {
    return { 
      // message: 'Error getting users who disliked the quote',
     error: error.message };
  }
}
  
}