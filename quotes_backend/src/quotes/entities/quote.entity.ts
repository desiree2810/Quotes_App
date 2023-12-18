import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, OneToOne} from 'typeorm';
import { User } from 'src/user/entities/user.entity';


@Entity({ name: 'quote' })
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quote: string;

  @Column()
  author: string;

  @Column()
  like: number;

  @Column()
  dislikes: number;

  @Column()
  tag: string;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP(6)',onUpdate: 'CURRENT_TIMESTAMP(6)',})
  updated_at: Date;

  // for m-1 relationship between quote & user
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.quotes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // new changes one to many
  // for m-n relationship between quotes & fav-quotes
  // @OneToMany(() => FavouriteQuote, (favouriteQuote) => favouriteQuote.quote)
  // favouriteQuotes: FavouriteQuote[];


}


