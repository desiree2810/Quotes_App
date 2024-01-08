import {Column,Entity, JoinColumn, ManyToOne} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuditingEntity } from 'src/core/entities/auditing.entity';


@Entity({ name: 'quote' })
export class Quote extends AuditingEntity {

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

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

}



