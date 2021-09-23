import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { GetUserListDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  save(user: User | Omit<User, 'id' | 'hobby'>): Promise<User> {
    console.log('user: ', user);
    return this.usersRepository.save(user);
  }

  getList(params: GetUserListDto): Promise<User[]> {
    console.log('params: ', params);
    return this.usersRepository.find({ relations: ['hobby'] });
  }

  getOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['hobby'] });
  }

  async delete(id: number | number[]): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
