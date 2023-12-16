import { Module } from "@nestjs/common";
import { PharmacyService } from "./pharmacy.service";
import { PharmacyController } from "./pharmacy.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Pharmacy, PharmacySchema } from "./schemas/pharmacy.schema";
import { Animal, AnimalSchema } from "src/animals/schemas/animal.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: Animal.name, schema: AnimalSchema },
    ]),
    
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
