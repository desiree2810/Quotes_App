import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  Query,
  UseGuards
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';


@SkipThrottle()
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

@SkipThrottle({ default: false })
// @Get()
// findAll(@Query('author') author?: string, @Query('tag') tag?: string, @Query('quote') quote?: string) {
//   return this.quotesService.findAll({ author, tag, quote });
// }

  @Get()
  async findAll(@Query() filter?: { author?: string; tag?: string; quote?: string }) {
    return this.quotesService.findAll(filter);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll(@Query('author') author?: string) {
  //   if (author) {
  //     // @UseGuards(JwtAuthGuard)
  //     return this.quotesService.findAll({ author });
  //   } else {
  //     //   @SkipThrottle({ default: false })
  //   return this.quotesService.findAll();
  //   }
  // }

// @UseGuards(JwtAuthGuard)
// @Get('authors')
// findAllAuthors(@Query('author') author?: string) {
//   if (author) {
//     return this.quotesService.findAll({ author });
//   }
// }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto, @Request() req: any) {
    const userId = req.user.userId;     //to get userID
    console.log(userId);
    return this.quotesService.create(createQuoteDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tags')
  getAllTagsByQuote() {
    return this.quotesService.getAllTagsByQuote();
  }

  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }

  //to extract the userid from the jwt token--> to like a quote using patch request
  @UseGuards(JwtAuthGuard)
  @Patch(':id/like/up')
  async likeQuote(@Request() req: any, @Param('id') id: string) {
    // const userId = req.user.userId;
    const userId = req.user.userId; ///to get userID
    console.log(userId);

    try {
      await this.quotesService.likeQuote(id, userId);
      return { message: 'Quote liked successfully' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/dislike/up')
  async dislikeQuote(@Request() req: any, @Param('id') id: string) {
    // const userId = req.user.userId;
    const userId = req.user.userId; ///to get userID
    console.log(userId);

    try {
      await this.quotesService.dislikeQuote(id, userId);
      return { message: 'Quote disliked successfully' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like/down')
  async remove_likeQuote(@Request() req: any, @Param('id') id: string) {
    // const userId = req.user.userId;
    const userId = req.user.userId; ///to get userID
    console.log(userId);

    try {
      await this.quotesService.remove_likeQuote(id, userId);
      return { message: 'Quote liked decremented' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }

  
  @UseGuards(JwtAuthGuard)
  @Patch(':id/dislike/down')
  async remove_dislikeQuote(@Request() req: any, @Param('id') id: string) {
    // const userId = req.user.userId;
    const userId = req.user.userId; ///to get userID
    console.log(userId);

    try {
      await this.quotesService.remove_dislikeQuote(id, userId);
      return { message: 'Quote disliked decremented' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }

    // find all users who liked the quote
  @UseGuards(JwtAuthGuard)
  @Get(':id/like/users')
  async getAllLikedUsers(@Param('id') id: string) {
    try {
      const users = await this.quotesService.getAllLikedUsers(id);
      return { users };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  
  @UseGuards(JwtAuthGuard)
  @Get(':id/dislike/users')
  async getAllDislikedUsers(@Param('id') id: string) {
    try {
      const users = await this.quotesService.getAllDislikedUsers(id);
      return { users };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
