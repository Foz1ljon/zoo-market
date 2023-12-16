import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class CreateAnimalDto {
  @ApiProperty({ example: "Baroqvoy", description: "Animal name" })
  @IsString()
  name: string;

  @ApiProperty({ example: "urushqoq nimadir nimadir", description: "Animal description" })
  @IsString()
  description: string;

  @ApiProperty({ example: "photo url", description: "Animal photo" })
  photo: string;

  @ApiProperty({ example: "6oy", description: "Animal age" })
  @IsNumberString()
  age: string;

  @ApiProperty({ example: "100$", description: "Animal price", default: "bepul" })
  @IsNumberString()
  price: string;

  @ApiProperty({ example: "23mc89wcqq8c", description: "Animal category" })
  @IsString()
  category: string;

  @ApiProperty({ example: "23mc89wcqq8c", description: "Animal type" })
  @IsString()
  type: string;
}
