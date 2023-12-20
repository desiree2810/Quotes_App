
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';  
import { Quote } from 'src/quotes/entities/quote.entity';  

@Entity()
export class UserQuoteReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like: boolean;

  @Column()
  dislike: boolean;

  @Column()
  quoteId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Quote)
  @JoinColumn({ name: 'quoteId' })
  quote: Quote;
}
