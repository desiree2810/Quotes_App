import { Quote } from 'src/quotes/entities/quote.entity';
import {Column,Entity,CreateDateColumn,UpdateDateColumn,PrimaryGeneratedColumn,OneToMany,OneToOne,} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column({ default: true }) // default to active
    isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)',})
  created_at: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)',})
  updated_at: Date;

}
