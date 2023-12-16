import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class CategoriesAnimal {
  @ApiProperty({ example: "Mushuklar", description: "Category name" })
  @Prop({ type: String, required: true })
  name: string;
}

export const CategoriesAnimalSchema = SchemaFactory.createForClass(CategoriesAnimal);
