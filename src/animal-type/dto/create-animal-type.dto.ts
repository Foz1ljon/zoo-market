import { ApiProperty } from "@nestjs/swagger";
import { IsUppercase } from "class-validator";

export class CreateAnimalTypeDto {
  @ApiProperty({ example: "Yirtqich", description: "Animal type" })
  @IsUppercase()
  name: string;
}
