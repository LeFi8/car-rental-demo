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

    async createCar(createCarInput: CreateCarInput): Promise<Car> {
        const newCar = this.carsRepository.create(createCarInput);
        return this.carsRepository.save(newCar);
    }

    async findAll(): Promise<Car[]> {
        return this.carsRepository.find();
    }

    async findCarsByBrand(brand: string): Promise<Car[]> {
        return this.carsRepository.find({ where: { brand } });
    }

    async rentACar(
        brand: string,
        year: number,
        rentersName: string,
    ): Promise<Car> {
        const car = await this.carsRepository.findOne({
            where: { brand, year, availableForRent: true },
        });

        if (!car) return null;

        car.availableForRent = false;
        car.currentRenterName = rentersName;
        await this.carsRepository.save(car);

        return car;
    }

    async returnACar(
        brand: string,
        year: number,
        rentersName: string,
    ): Promise<Car> {
        const car = await this.carsRepository.findOne({
            where: {
                brand,
                year,
                availableForRent: false,
                currentRenterName: rentersName,
            },
        });

        if (!car) return null;

        car.availableForRent = true;
        car.currentRenterName = null;
        await this.carsRepository.save(car);

        return car;
    }
}
