import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateCarInput {
    @Field()
    brand: string;

    @Field()
    year: number;

    @Column()
    @Field()
    availableForRent: boolean;

    @Column({ nullable: true })
    @Field({ nullable: true })
    currentRenterName: string;
}
