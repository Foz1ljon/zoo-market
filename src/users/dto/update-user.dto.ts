import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "Laziz", description: "First Name" })
  @IsOptional()
  @IsString()
  fname?: string;

  @ApiProperty({ example: "Lazizov", description: "Last Name" })
  @IsOptional()
  @IsString()
  lname?: string;

  @ApiProperty({ example: "Laziz@mail.ru", description: "Email" })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: "+998911234567", description: "Phone number" })
  @IsOptional()
  @IsPhoneNumber("UZ")
  phone_number?: string;

  @ApiProperty({ example: "<PASSWORD>", description: "Password" })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
