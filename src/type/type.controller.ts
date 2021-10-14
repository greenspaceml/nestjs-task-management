import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './type.entity';
import { AuthGuard } from '@nestjs/passport';
import { FilterTypeDto } from './dto/filter-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Task } from '../tasks/task.entity';

@Controller('types')
@UseGuards(AuthGuard())
export class TypeController {
  constructor(
    private typeService: TypeService,
  ) {
  }

  @Post()
  createType(
    @Body() createTypeDto: CreateTypeDto,
  ): Promise<Type> {
    return this.typeService.createType(createTypeDto);
  }

  @Get()
  getTypes(
    @Query() filterTypeDto: FilterTypeDto,
  ): Promise<Type[]> {
    return this.typeService.getTypes(filterTypeDto);
  }

  @Patch('/:id/update')
  updateType(
    @Param('id') id: string,
    @Body() updateTypeDto: UpdateTypeDto,
  ): Promise<Type> {
    return this.typeService.updateType(id, updateTypeDto);
  }

  @Get('/:id')
  getTypeById(
    @Param('id') id: string,
  ): Promise<Type> {
    return this.typeService.getTypeById(id);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
  ): Promise<{ id: string }> {
    return this.typeService.deleteType(id);
  }
}
