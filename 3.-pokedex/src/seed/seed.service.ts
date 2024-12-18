import { BadRequestException, Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FetchAdapter } from 'src/common/adapters/FetchAdapter';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: FetchAdapter
  ) { }
  async executedSeed() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=650`
    await this.pokemonModel.deleteMany({})
    const pokemonToInsert: { name: string, no: number }[] = [];
    try {
      const data = await this.http.get<PokeResponse>(url)
      data.results.forEach(async ({ name, url }) => {
        const no = +url.split('/').slice(-2, -1)[0];
        console.log(no)
        pokemonToInsert.push({ name, no })
      })
      await this.pokemonModel.insertMany(pokemonToInsert);
      return 'Seed Executed';
    }
    catch (error) {
      console.log(`Falid to fetch Pokemon data:${error}`)
      throw new BadRequestException(`${error}`)
    }
  }
}


