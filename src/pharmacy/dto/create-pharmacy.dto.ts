import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePharmacyDto {
  @ApiProperty({ example: "<TITLE>", description: "pharmacy title" })
  @IsString()
  title: string;
  @ApiProperty({ example: "<DESCRIPTION>", description: "pharmacy description" })
  @IsString()
  description: string;
  @ApiProperty({ example: "<PRICE>", description: "pharmacy price" })
  @IsNumber()
  price: number;
  @ApiProperty({ example: "<ANIMAL>", description: "pharmacy animal" })
  @IsString()
  animal: string;
}
