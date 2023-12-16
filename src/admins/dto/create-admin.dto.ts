import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";

export class AddAdminDto {
  @ApiProperty({ example: "Nosirov Zokir", description: "Admin's full name" })
  @IsString()
  fullname: string;
  @ApiProperty({ example: "<EMAIL>", description: "Admin's email" })
  @IsString()
  email: string;
  @ApiProperty({ example: "+998901234567", description: "Admin's phone" })
  @IsPhoneNumber("UZ")
  phone_number: string;
  @ApiProperty({ example: "<PASSWORD>", description: "Admin's password" })
  @IsString()
  password: string;
}
