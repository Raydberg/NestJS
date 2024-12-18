import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class FetchAdapter implements HttpAdapter {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url).catch(() => {
            throw new HttpException('Error al obtener datos', HttpStatus.BAD_REQUEST);
        });

        if (!response.ok) {
            throw new HttpException(response.statusText, response.status);
        }

        return response.json();
    }
}