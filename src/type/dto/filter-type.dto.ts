import { IsOptional, IsString } from 'class-validator';

export class FilterTypeDto {
  @IsOptional()
  @IsString()
  title: string;
}
