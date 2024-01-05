import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PersistentEntity } from "./persistent.entity";

export abstract class AuditingEntity extends PersistentEntity {
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;
  }