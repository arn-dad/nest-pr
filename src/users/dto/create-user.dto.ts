import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'some@email.com', description: 'User Email' })
  readonly email: string;
  @ApiProperty({ example: '123456', description: 'User Password' })
  readonly password: string;
}
