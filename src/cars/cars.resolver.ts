import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { Car } from './car.entity';
import { CreateCarInput } from './dto/create-car.input';

@Resolver(() => Car)
export class CarsResolver {
    constructor(private carsService: CarsService) {}

    @Query(() => [Car])
    async cars(): Promise<Car[]> {
        return this.carsService.findAll();
    }

    @Query(() => [Car])
    async carsByBrand(@Args('brand') brand: string): Promise<Car[]> {
        return this.carsService.findCarsByBrand(brand);
    }

    @Query(() => [Car])
    async findAllCarsAvailableForRenting(): Promise<Car[]> {
        return this.carsService.findAllCarsAvailableForRenting();
    }

    @Query(() => Car)
    async rentACar(
        @Args('brand') brand: string,
        @Args('year') year: number,
        @Args('name') name: string,
    ): Promise<Car> {
        const car = await this.carsService.rentACar(brand, year, name);

        if (!car)
            throw new Error(
                'No car with the given brand and year is currently available for renting',
            );

        return car;
    }

    @Query(() => Car)
    async returnACar(
        @Args('brand') brand: string,
        @Args('year') year: number,
        @Args('name') name: string,
    ) {
        const car = await this.carsService.returnACar(brand, year, name);

        if (!car) throw new Error("Car not found! Can't return that car");

        return car;
    }

    @Mutation(() => Car)
    async createCar(
        @Args('createCarInput') createCarInput: CreateCarInput,
    ): Promise<Car> {
        return this.carsService.createCar(createCarInput);
    }
}
