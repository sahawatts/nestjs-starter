import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsEnum(Role, {
    message: `Role must be one of these values: INTERN, ENGINEER, ADMIN`,
  })
  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    example: Role.INTERN,
  })
  role: Role;
}
