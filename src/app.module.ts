import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { CarsModule } from './cars/cars.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        CarsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
