import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Car {
    @PrimaryGeneratedColumn({
        name: 'id_car',
    })
    @Field(() => Int)
    id: number;

    @Field()
    @Column()
    ownersName: string;

    @Column()
    @Field()
    brand: string;

    @Column()
    @Field()
    year: number;
}
