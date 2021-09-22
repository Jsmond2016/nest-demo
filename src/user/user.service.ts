import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { GetUserListDto } from './dto'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  getList(params: GetUserListDto): Promise<User[]> {
    console.log('params: ', params);
    return this.usersRepository.find();
  }

  getOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
