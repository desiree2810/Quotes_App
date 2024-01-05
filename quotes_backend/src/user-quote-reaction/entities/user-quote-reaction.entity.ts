import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Quote } from 'src/quotes/entities/quote.entity';

@Entity()
export class UserQuoteReaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  like: boolean;

  @Column()
  dislikes: boolean;

  @Column()
  quoteId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Quote)
  @JoinColumn({ name: 'quoteId' })
  quote: Quote;
}
