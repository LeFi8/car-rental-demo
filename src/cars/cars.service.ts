import { Injectable } from '@nestjs/common';
import { Car } from './car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarInput } from './dto/create-car.input';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private carsRepository: Repository<Car>,
    ) {}

    createCar(createCarInput: CreateCarInput): Promise<Car> {
        const newCar = this.carsRepository.create(createCarInput);
        return this.carsRepository.save(newCar);
    }

    async findAll(): Promise<Car[]> {
        return this.carsRepository.find();
    }
}
