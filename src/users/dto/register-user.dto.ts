import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({ example: "Laziz", description: "First Name" })
  @IsString()
  fname: string;

  @ApiProperty({ example: "Lazizov", description: "Last Name" })
  @IsString()
  lname: string;

  @ApiProperty({ example: "Laziz@mail.ru", description: "Email" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998911234567", description: "Phone number" })
  @IsPhoneNumber("UZ")
  phone_number: string;

  @ApiProperty({ example: "<PASSWORD>", description: "Password" })
  @IsStrongPassword()
  password: string;
}
