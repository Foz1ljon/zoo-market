import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUppercase } from "class-validator";

export class UpdateAnimalTypeDto {
  @ApiProperty({ example: "Yirtqich", description: "Animal type" })
  @IsOptional()
  @IsUppercase()
  name?: string;
}
