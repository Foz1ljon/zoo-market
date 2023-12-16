import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class AnimalType {
  @ApiProperty({ example: "Yirtqich", description: "Animal type" })
  @Prop({ type: String, required: true })
  name: string;
}

export const AnimalTypeSchema = SchemaFactory.createForClass(AnimalType);
