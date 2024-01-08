import {Column,Entity} from 'typeorm';
import { AuditingEntity } from 'src/core/entities/auditing.entity';


@Entity()
export class User extends AuditingEntity{

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

}
