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
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';

@SkipThrottle()
@Controller('quotes')
@ApiTags('Quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @SkipThrottle({ default: false })
  @Get()
  async findAll(
    @Query() filter?: { author?: string; tag?: string; quote?: string },
  ) {
    return this.quotesService.findAll(filter);
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto, @Request() req: any) {
    const userId = req.user.userId; //to get userID
    console.log(userId);
    return this.quotesService.create(createQuoteDto, userId);
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Get('tags')
  getAllTagsByQuote() {
    return this.quotesService.getAllTagsByQuote();
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id);
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }

  //to extract the userid from the jwt token--> to like a quote using patch request
  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Patch(':id/like/up')
  @HttpCode(204)
  async likeQuote(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.userId; //to get userID
    console.log(userId);

    try {
      await this.quotesService.likeQuote(id, userId);
      return { message: 'Quote liked successfully' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Patch(':id/dislike/up')
  @HttpCode(204)
  async dislikeQuote(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.userId; //to get userID
    console.log(userId);

    try {
      await this.quotesService.dislikeQuote(id, userId);
      return { message: 'Quote disliked successfully' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Patch(':id/like/down')
  @HttpCode(204)
  async remove_likeQuote(@Request() req: any, @Param('id') id: string) {
    const userId = req.user.userId;
    console.log(userId);

    try {
      await this.quotesService.remove_likeQuote(id, userId);
      return { message: 'Quote liked decremented' };
    } catch (error) {
      return { message: 'Error liking the quote', error: error.message };
    }
  }

  @ApiSecurity("JWT-auth")
  @UseGuards(JwtAuthGuard)
  @Patch(':id/dislike/down')
  @HttpCode(204)
  async remove_dislikeQuote(@Request() req: any, @Param('id') id: string) {
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
  @ApiSecurity("JWT-auth")
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


  @ApiSecurity("JWT-auth")
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
