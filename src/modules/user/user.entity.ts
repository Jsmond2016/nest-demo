import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Hobby } from '../hobby/hobby.entity';

@Entity('user')
export class User {
  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'name', description: 'The age of the Cat' })
  @Column({ default: '' })
  name: string;

  @ApiProperty({ example: 13909098989, description: 'The age of the Cat' })
  @Column({ default: '' })
  phone: string;

  @OneToMany(() => Hobby, (hobby) => hobby.users)
  @JoinColumn()
  hobby: Hobby;
}
