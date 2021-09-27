import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Hobby } from '../hobby/hobby.entity';

@Entity('user')
export class User {
  @ApiProperty({ example: 1, description: '唯一id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'name', description: '用户名' })
  @Column({ default: '', charset: 'utf8', comment: '用户名' })
  name: string;

  @ApiProperty({ example: 13909098989, description: '用户电话' })
  @Column({ default: '', length: 11, charset: 'utf8', comment: '用户电话' })
  phone: string;

  // @CreateDateColumn()
  // createdTime: Date;

  // @UpdateDateColumn()
  // updatedTime: Date;

  @OneToMany(() => Hobby, (hobby) => hobby.user)
  hobby: Hobby[];
}
