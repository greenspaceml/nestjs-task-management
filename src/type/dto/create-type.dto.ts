import { IsNotEmpty } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty()
  title: string;
}
