import { EntityRepository, Repository } from 'typeorm';
import { Type } from './type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { FilterTypeDto } from './dto/filter-type.dto';

@EntityRepository(Type)
export class TypesRepository extends Repository<Type> {

  async createType(createTypeDto: CreateTypeDto): Promise<Type> {
    const { title } = createTypeDto;
    const type = this.create({
      title: title,
    });
    await this.save(type);
    return type;
  }

  async getTypes(filterTypeDto: FilterTypeDto): Promise<Type[]> {
    const { title } = filterTypeDto;
    const query = this.createQueryBuilder('type');
    if (title) {
      query.andWhere(
        'LOWER(type.title) LIKE LOWER(:search)',
        { search: `%${title}%` },
      );
    }
    const types = await query.getRawMany();
    return types;
  }
}
