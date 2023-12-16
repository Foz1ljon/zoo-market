import { Module } from "@nestjs/common";
import { AnimalsService } from "./animals.service";
import { AnimalsController } from "./animals.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Animal, AnimalSchema } from "./schemas/animal.schema";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { AnimalType, AnimalTypeSchema } from "src/animal-type/schemas/animal-type.schema";
import { CategoriesAnimal, CategoriesAnimalSchema } from "src/categories-animals/schemas/categories-animal.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Animal.name, schema: AnimalSchema },
      { name: AnimalType.name, schema: AnimalTypeSchema },
      { name: CategoriesAnimal.name, schema: CategoriesAnimalSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
