import { EntityRepository, Repository } from 'typeorm';
import { UserQuoteReaction } from './entities/user-quote-reaction.entity';

@EntityRepository(UserQuoteReaction)
export class UserQuoteReactionRepository extends Repository<UserQuoteReaction> {
}
