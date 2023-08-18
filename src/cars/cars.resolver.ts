import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { Car } from './car.entity';
import { CreateCarInput } from './dto/create-car.input';

@Resolver(() => Car)
export class CarsResolver {
    constructor(private carsService: CarsService) {}

    @Query(() => [Car])
    cars(): Promise<Car[]> {
        return this.carsService.findAll();
    }

    @Mutation(() => Car)
    createCar(
        @Args('createCarInput') createCarInput: CreateCarInput,
    ): Promise<Car> {
        return this.carsService.createCar(createCarInput);
    }
}
