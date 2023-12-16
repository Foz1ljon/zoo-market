import { Module } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { AdminsController } from "./admins.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminsSchema } from "./schemas/admin.schema";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminsSchema }]),
    ConfigModule.forRoot({ envFilePath: ".env" }),
    JwtModule.register({
      secret: env.JWTSKA,
      signOptions: { expiresIn: env.JWTT },
    }),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
