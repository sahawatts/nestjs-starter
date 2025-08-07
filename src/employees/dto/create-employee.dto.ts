import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../entities/employee.entity';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the employee', example: 'Jane Doe' })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the employee',
    example: 'jane.doe@example.com',
  })
  email: string;

  @IsEnum(Role, {
    message: `Role must be one of these values: INTERN, ENGINEER, ADMIN`,
  })
  @ApiProperty({
    description: 'The role of the employee',
    enum: Role,
    example: Role.ENGINEER,
  })
  role: Role;
}
