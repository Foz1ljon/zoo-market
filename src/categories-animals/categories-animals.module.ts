import { Module } from "@nestjs/common";
import { CategoriesAnimalsService } from "./categories-animals.service";
import { CategoriesAnimalsController } from "./categories-animals.controller";
import { CategoriesAnimal, CategoriesAnimalSchema } from "./schemas/categories-animal.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [MongooseModule.forFeature([{ name: CategoriesAnimal.name, schema: CategoriesAnimalSchema }]), JwtModule],

  controllers: [CategoriesAnimalsController],
  providers: [CategoriesAnimalsService],
})
export class CategoriesAnimalsModule {}
