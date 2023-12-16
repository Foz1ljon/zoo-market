import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Animal } from "src/animals/schemas/animal.schema";

@Schema({ versionKey: false })
export class Pharmacy {
  @ApiProperty({ example: "<TITLE>", description: "pharmacy title" })
  @Prop({ type: String, required: true })
  title: string;
  @ApiProperty({ example: "<DESCRIPTION>", description: "pharmacy description" })
  @Prop({ type: String, required: true })
  description: string;
  @ApiProperty({ example: "<PRICE>", description: "pharmacy price" })
  @Prop({ type: String, required: true })
  price: number;
  @ApiProperty({ example: "<ANIMAL>", description: "pharmacy animal" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Animal" })
  animal: Animal;
  @ApiProperty({ example: "<BOOLEAN>", description: "pharmacy active" })
  @Prop({ type: Boolean, default: true })
  active: boolean;
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);
