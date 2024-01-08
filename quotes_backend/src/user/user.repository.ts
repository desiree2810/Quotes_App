import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: User) {
    const saveUser = this.save(user);
    return saveUser;
  }

  async findAllUsers() {
    return this.find({ relations: {} });
  }

  // not being used should we remove this?
  async findOneUser(id: string) {
    return await this.findOne({ where: { id } });
  }

  async findEmailOfUser(email) {
    return await this.findOne({ where: { email: email } });
  }

  async updateUser(id: string, user: User) {
    return this.save(user);
  }

  async softDeleteUser(id: string, user) {
    if (!user) {
      return {
        message: `User with ID ${id} not found`,
      };
    } else {
      return {
        message: `User with ID ${id} is now inactive.`,
      };
    }
  }

  async fetchAllQuotesByUser(id: string, allQuotes) {
    if (allQuotes.length === 0) {
      return { message: `User with ID ${id} has added no quotes.` };
    } else {
      return allQuotes;
    }
  }

  async fetchAllQuotesListDislikedByUser(id: string, AllDislikedQuotes) {
    if (AllDislikedQuotes.length === 0) {
      return { message: `User with ID ${id} has not disliked any quotes.` };
    } else {
      return AllDislikedQuotes.map(
        (AllDislikedQuote) => AllDislikedQuote.quote,
      );
    }
  }

  async fetchAllQuotesListLikedByUser(id: string, AllLikedQuotes) {
    if (AllLikedQuotes.length === 0) {
      return { message: `User with ID ${id} has not liked any quotes.` };
    } else {
      return AllLikedQuotes.map((AllLikedQuote) => AllLikedQuote.quote);
    }
  }
}
