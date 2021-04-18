import { ApiProperty } from '@nestjs/swagger';

export class BlockUserDTO {
  @ApiProperty({
    example: 'Payment issue',
    description: 'Reason for blocking the user',
  })
  readonly banReason: string;
  @ApiProperty({ example: 5, description: 'User ID' })
  readonly userId: number;
}
