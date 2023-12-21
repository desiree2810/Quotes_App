import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, OneToOne} from 'typeorm';
import { User } from 'src/user/entities/user.entity';


@Entity({ name: 'quote' })
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

}


