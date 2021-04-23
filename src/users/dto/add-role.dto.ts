import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class AddRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  @IsString({ message: 'Value must be a string' })
  readonly vale: string;

  @ApiProperty({ example: 5, description: 'User ID' })
  @IsNumber({}, { message: 'Value must be a number' })
  readonly userId: number;
}
