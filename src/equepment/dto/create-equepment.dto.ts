import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEquepmentDto {
  @ApiProperty({ example: "url", description: "Photo url" })
  photo: string;
  @ApiProperty({ example: "<NAME>", description: "Equepment name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "<DESCRIPTION>", description: "Equepment description" })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: "<Animal>", description: "Equepment animal" })
  @IsNotEmpty()
  @IsString()
  animal: string;
}
