import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class LoginAdminDto {
  @ApiProperty({
    example: "<+998998765432>",
    description: "Admin's phone number",
  })
  @IsPhoneNumber("UZ")
  phone_number: string;
  @IsString()
  @ApiProperty({ example: "<PASSWORD>", description: "Admin's password" })
  password: string;
}
