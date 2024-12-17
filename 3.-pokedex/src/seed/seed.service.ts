import { BadRequestException, Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  async executedSeed(): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=650`
    try {
      const response = await fetch(url)
      if (!response.ok) throw new BadRequestException(`Error fetching data ${response.statusText}`)
      const data: PokeResponse = await response.json()
      data.results.forEach(({ name, url }) => {
        const no = +url.split('/').slice(-2, -1)[0]
      })
      return data.results
    }
    catch (error) {
      console.log(`Falid to fetch Pokemon data:${error}`)
      throw new BadRequestException(`${error}`)
    }

  }

}
