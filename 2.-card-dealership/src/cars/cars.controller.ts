import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './interfaces/car.interface';
import { CreateCardDto } from './dto/create-car.dto';
import { UpdateCardDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor(private readonly carsService: CarsService) { }
    @Get()
    getAllCars(): Car[] {
        return this.carsService.findAll();
    }
    @Get(':id')
    getCardById(@Param('id', ParseUUIDPipe) id: string): Car {
        return this.carsService.findOneById(id);
    }
    @Post()
    createCar(@Body() createCarDto: CreateCardDto) {
        return this.carsService.create(createCarDto);
    }
    @Patch(':id')
    updateCar(
        @Body() updateCarDto: UpdateCardDto,
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.carsService.update(id, updateCarDto);
    }
    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }
}
