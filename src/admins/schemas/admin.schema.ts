import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Admin {
  @Prop({ type: String, required: true })
  fullname: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true, unique: true })
  phone_number: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ default: false })
  super: boolean;
}

export const AdminsSchema = SchemaFactory.createForClass(Admin);
