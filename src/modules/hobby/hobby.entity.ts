import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity('hobby')
export class Hobby {
  @ApiProperty({ example: 1, description: 'hobby id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'name', description: 'hobby name' })
  @Column({ default: '' })
  name: string;

  @ManyToOne(() => User, (user) => user.hobby)
  @JoinColumn()
  users: User[];
}
