import { ApiProperty } from "@nestjs/swagger";
import { IsUppercase } from "class-validator";

export class CreateCategoriesAnimalDto {
  @ApiProperty({ example: "Mushuklar", description: "Category name" })
  @IsUppercase()
  name: string;
}
