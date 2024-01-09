import { DataSource, Repository } from 'typeorm';
import { UserQuoteReaction } from './entities/user-quote-reaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserQuoteReactionRepository extends Repository<UserQuoteReaction> {
    constructor(private dataSource: DataSource) {
        super(UserQuoteReaction, dataSource.createEntityManager());
      }

    async createUserReaction(userquotereaction: UserQuoteReaction) {
        const saveReaction = this.save(userquotereaction);
        return saveReaction;
    }
}
