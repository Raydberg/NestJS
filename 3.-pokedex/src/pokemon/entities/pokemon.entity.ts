import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    //*Mongo me lo autogenera
    // id:string
    @Prop({
        unique: true,
        index: true
    })
    name: string;
    @Prop({
        unique: true,
        index: true
    })
    no: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);