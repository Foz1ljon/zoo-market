import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateAdminDto {
  @ApiProperty({ example: "Nosirov Zokir", description: "Admin's full name" })
  @IsOptional()
  @IsString()
  fullname?: string;
  @ApiProperty({ example: "<EMAIL>", description: "Admin's email" })
  @IsOptional()
  @IsString()
  email?: string;
  @ApiProperty({ example: "+998901234567", description: "Admin's phone" })
  @IsPhoneNumber("UZ")
  phone_number?: string;
  @ApiProperty({ example: "<PASSWORD>", description: "Admin's password" })
  @IsOptional()
  @IsString()
  password?: string;
}
