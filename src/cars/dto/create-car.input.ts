import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCarInput {
    @Field()
    brand: string;

    @Field()
    year: number;
}
