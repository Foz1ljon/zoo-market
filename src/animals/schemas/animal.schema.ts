import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { AnimalType } from "src/animal-type/schemas/animal-type.schema";
import { CategoriesAnimal } from "src/categories-animals/schemas/categories-animal.schema";

@Schema({ versionKey: false })
export class Animal {
  @ApiProperty({ example: "Baroqvoy", description: "Animal name" })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ example: "urushqoq nimadir nimadir", description: "Animal description" })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({ example: "photo url", description: "Animal photo" })
  @Prop({ type: String, required: true })
  photo: string;

  @ApiProperty({ example: "6oy", description: "Animal age" })
  @Prop({ type: String, required: true })
  age: string;

  @ApiProperty({ example: "100$", description: "Animal price", default: "bepul" })
  @Prop({ default: "Bepul" })
  price: string;

  @ApiProperty({ example: "23mc89wcqq8c", description: "Animal category" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "CategoriesAnimal" })
  category: CategoriesAnimal;

  @ApiProperty({ example: "23mc89wcqq8c", description: "Animal type" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "AnimalType" })
  type: AnimalType;

  @ApiProperty({ example: "true", description: "Animal is_active" })
  @Prop({ default: false })
  is_active: boolean;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
