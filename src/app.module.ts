import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { env } from "process";
import { AdminsModule } from "./admins/admins.module";
import { UsersModule } from "./users/users.module";
import { CategoriesAnimalsModule } from "./categories-animals/categories-animals.module";
import { AnimalTypeModule } from "./animal-type/animal-type.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { AnimalsModule } from "./animals/animals.module";
import { PharmacyModule } from "./pharmacy/pharmacy.module";
import { EquepmentModule } from "./equepment/equepment.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(env.MONGODB_URL),
    AdminsModule,
    UsersModule,
    CategoriesAnimalsModule,
    AnimalTypeModule,
    CloudinaryModule,
    AnimalsModule,
    PharmacyModule,
    EquepmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
