import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TypesRepository } from './type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypesRepository]),
    AuthModule,
  ],
  providers: [TypeService],
  controllers: [TypeController],
  exports: [TypeService]
})
export class TypeModule {}
