import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCardDto } from './dto/create-car.dto';
import { UpdateCardDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
    private cars: Car[] = []

    public findAll(): Car[] {
        return this.cars
    }

    findOneById(id: string): Car {
        const car = this.cars.find(car => car.id === id)
        if (!car) throw new NotFoundException(`Car with id ${id} not`);
        return car;
    }
    create(createCardDto: CreateCardDto): Car {
        const car: Car = {
            id: uuid(),
            ...createCardDto
        }
        this.cars.push(car)
        return car;
    }

    update(id: string, updateCarDto: UpdateCardDto) {
        let carDB = this.findOneById(id);
        this.cars = this.cars.map((car) => {
            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto, id, }
                return car;
            }
        })
        return carDB;
    }
    delete(id: string) {
        const car = this.findOneById(id)
        this.cars = this.cars.filter((car) => car.id !== id);
    }
    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
