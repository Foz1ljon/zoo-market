import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateAnimalDto {
  @ApiProperty({ example: "Baroqvoy", description: "Animal name" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: "urushqoq nimadir nimadir", description: "Animal description" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: "photo url", description: "Animal photo" })
  @IsOptional()
  photo?: string;

  @ApiProperty({ example: "6oy", description: "Animal age" })
  @IsOptional()
  @IsNumberString()
  age?: string;

  @ApiProperty({ example: "100$", description: "Animal price", default: "bepul" })
  @IsOptional()
  @IsNumberString()
  price?: string;

  @ApiProperty({ example: "23mc89wcqq8c", description: "Animal category" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: "23mc89wcqq8c", description: "Animal type" })
  @IsOptional()
  @IsString()
  type?: string;
}
