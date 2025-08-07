import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(createEmployeeDto);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOneBy({ id });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
