import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ example: "+998911234567", description: "Phone number" })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ example: "<PASSWORD>", description: "Password" })
  @IsString()
  password: string;
}
