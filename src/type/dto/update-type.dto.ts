import { IsNotEmpty } from 'class-validator';

export class UpdateTypeDto {
  @IsNotEmpty()
  title: string;
}
