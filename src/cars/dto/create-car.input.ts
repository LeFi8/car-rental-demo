import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCarInput {
    @Field()
    ownersName: string;

    @Field()
    brand: string;

    @Field()
    year: number;
}
