import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blocked_domain')
export class BlockedDomain extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'character varying', name: 'domain', length: 255, unique: true })
  domain!: string;
}
