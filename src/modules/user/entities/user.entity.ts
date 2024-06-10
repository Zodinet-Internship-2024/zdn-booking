import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
  user = 'user',
  owner = 'owner',
}

@Entity()
export class User extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ type: 'character varying', length: 52, nullable: false })
  name: string;

  @AutoMap()
  @Column({
    type: 'character varying',
    length: 320,
    unique: true,
    nullable: false,
  })
  email: string;

  @AutoMap()
  @Column({
    type: 'character varying',
    length: 10,
    unique: true,
    nullable: false,
  })
  phone: string;

  @AutoMap()
  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @AutoMap()
  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;

  @AutoMap()
  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  password: string;

  @AutoMap()
  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @OneToMany(() => BaseEntity, (base) => base.createdBy)
  createdEntities: BaseEntity[];
}
