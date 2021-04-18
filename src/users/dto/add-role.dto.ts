import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDTO {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  readonly vale: string;
  @ApiProperty({ example: 5, description: 'User ID' })
  readonly userId: number;
}
