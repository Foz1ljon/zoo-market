import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Animal } from "src/animals/schemas/animal.schema";

@Schema({ versionKey: false })
export class Equepment {
  @ApiProperty({ example: "url", description: "Photo url" })
  @Prop({ type: String, required: true })
  photo: string;

  @ApiProperty({ example: "<NAME>", description: "Equepment name" })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ example: "<DESCRIPTION>", description: "Equepment description" })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({ example: "<Animal>", description: "Equepment animal" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Animal" })
  animal: Animal;
}

export const EquepmentSchema = SchemaFactory.createForClass(Equepment);
