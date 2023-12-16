import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false })
export class User {
  @ApiProperty({ example: "Laziz", description: "First Name" })
  @Prop({ type: String, required: true })
  fname: string;
  @ApiProperty({ example: "Lazizov", description: "Last Name" })
  @Prop({ type: String, required: true })
  lname: string;

  @ApiProperty({ example: "Laziz@mail.ru", description: "Email" })
  @Prop({ type: String, required: true })
  email: string;
  @ApiProperty({ example: "+998911234567", description: "Phone number" })
  @Prop({ type: String, required: true })
  phone_number: string;

  @ApiProperty({ example: "<PASSWORD>", description: "Password" })
  @Prop({ type: String, required: true })
  password: string;
  @ApiProperty({ example: "TRUE", description: "User is Active" })
  @Prop({ default: false })
  is_active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
