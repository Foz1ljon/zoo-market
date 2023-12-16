import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUppercase } from "class-validator";

export class UpdateCategoriesAnimalDto {
  @ApiProperty({ example: "Mushuklar", description: "Category name" })
  @IsOptional()
  @IsUppercase()
  name?: string;
}
