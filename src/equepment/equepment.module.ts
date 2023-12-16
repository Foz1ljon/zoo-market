import { Module } from "@nestjs/common";
import { EquepmentService } from "./equepment.service";
import { EquepmentController } from "./equepment.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Equepment, EquepmentSchema } from "./schemas/equepment.schema";
import { Animal, AnimalSchema } from "src/animals/schemas/animal.schema";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Equepment.name, schema: EquepmentSchema },
      { name: Animal.name, schema: AnimalSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [EquepmentController],
  providers: [EquepmentService],
})
export class EquepmentModule {}
