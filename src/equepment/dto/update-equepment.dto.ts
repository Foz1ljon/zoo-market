import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEquepmentDto {
  @ApiProperty({ example: "url", description: "Photo url" })
  photo?: string;

  @ApiProperty({ example: "<NAME>", description: "Equepment name" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ example: "<DESCRIPTION>", description: "Equepment description" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiProperty({ example: "<Animal>", description: "Equepment animal" })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  animal?: string;
}
