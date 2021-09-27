import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity('hobby')
export class Hobby {
  @ApiProperty({ example: 1, description: 'hobby id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'name', description: 'hobby name' })
  @Column({ default: '', comment: '姓名' })
  name: string;

  @Column({ default: null, comment: '用户id'})
  userId: number;

  // @CreateDateColumn()
  // createdTime: Date;

  // @UpdateDateColumn()
  // updatedTime: Date;

  @ManyToOne(() => User, (user) => user.hobby)
  user: User;
}
