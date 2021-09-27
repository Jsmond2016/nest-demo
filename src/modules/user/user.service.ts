import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';
import { GetUserListDto } from './dto';
import { Hobby } from '../hobby/hobby.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async save(user: CreateUserDto): Promise<any> {
    console.log('user: ', user);
    const { hobby, ...userInfo } = user;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { id } = await queryRunner.manager.save(User, userInfo);
      console.log('id: ', id);
      const hobbies = hobby.map((h) => ({ ...h, userId: id }));
      console.log('hobbies: ', hobbies);
      await queryRunner.manager.save(Hobby, hobbies);

      await queryRunner.commitTransaction();
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      //你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
    // return this.usersRepository.save(user);
    // return Promise.resolve();
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
