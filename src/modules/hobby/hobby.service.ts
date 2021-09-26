import { Hobby } from '../hobby/hobby.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobby)
    private hobbyRepository: Repository<Hobby>,
  ) {}

  async getOne(params) {
    return this.hobbyRepository.findOne(params);
  }

  async getList(params) {
    console.log('params: ', params);
    return this.hobbyRepository.find();
  }

  async create(data) {
    return this.hobbyRepository.save(data);
  }

  async update(data) {
    return this.hobbyRepository.save(data);
  }

  async delete(data) {
    return this.hobbyRepository.delete(data);
  }

  async batchDelete(data) {
    return this.hobbyRepository.delete(data);
  }
}
