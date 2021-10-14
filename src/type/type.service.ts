import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypesRepository } from './type.repository';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './type.entity';
import { FilterTypeDto } from './dto/filter-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(TypesRepository)
    private typesRepository: TypesRepository,
  ) {
  }

  createType(createTypeDto: CreateTypeDto): Promise<Type> {
    const result = this.typesRepository.createType(createTypeDto);
    return result;
  }

  async getTypeById(typeID: string): Promise<Type> {
    const type = await this.typesRepository.findOne(typeID);
    return type;
  }

  async getTypes(filterTypeDto: FilterTypeDto): Promise<Type[]> {
    const types = await this.typesRepository.getTypes(filterTypeDto);
    return types;
  }

  async updateType(id: string, info: UpdateTypeDto): Promise<Type> {
    const type = await this.getTypeById(id);
    type.title = info.title;
    await this.typesRepository.save(type);
    return type;
  }

  async deleteType(id: string): Promise<{ id: string }> {
    const result = await this.typesRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return { id };
  }
}
