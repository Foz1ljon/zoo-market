import { ApiProperty } from "@nestjs/swagger";

import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePharmacyDto {
  @ApiProperty({ example: "<TITLE>", description: "pharmacy title" })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiProperty({ example: "<DESCRIPTION>", description: "pharmacy description" })
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty({ example: "<PRICE>", description: "pharmacy price" })
  @IsOptional()
  @IsNumber()
  price?: number;
  @ApiProperty({ example: "<ANIMAL>", description: "pharmacy animal" })
  @IsOptional()
  @IsString()
  animal?: string;
}
