import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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

  // @Column({ default: true })
  // isActive: boolean;
}
