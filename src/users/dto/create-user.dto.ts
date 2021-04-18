import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'some@email.com', description: 'User Email' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid Email' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'User Password' })
  @IsString({ message: 'Password must be a string' })
  @Length(4, 8, {
    message: 'Password length must be between 4 to 8 characters',
  })
  readonly password: string;
}
