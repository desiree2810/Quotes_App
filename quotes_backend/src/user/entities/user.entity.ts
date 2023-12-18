import { Quote } from 'src/quotes/entities/quote.entity';
import {Column,Entity,CreateDateColumn,UpdateDateColumn,PrimaryGeneratedColumn,OneToMany,OneToOne,} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

//   @Column()
//   role: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)',})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)',})
  updated_at: Date;

  // for 1-M relationship between User & quote
  @OneToMany(() => Quote, (quote) => quote.user)
  quotes: Quote[];

//   // for 1-1 relationship between user and fav-qoutes
//   // @OneToOne(() => FavouriteQuote, (fav_quote) => fav_quote.user)     //mayur
//   // favourite_quote: FavouriteQuote;

//     // One-to-Many relationship: One User can have Many FavouriteQuotes
//     @OneToMany(() => FavouriteQuote, (favouriteQuote) => favouriteQuote.user)     //desiree
//     favouriteQuotes: FavouriteQuote;
}
