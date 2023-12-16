import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { AddAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("admins")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}
  @ApiOperation({ summary: "add a new admin" })
  @Post()
  create(@Body() addAdminDto: AddAdminDto) {
    return this.adminsService.create(addAdminDto);
  }

  @ApiOperation({ summary: "login an admin" })
  @Post()
  @HttpCode(200)
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminsService.login(loginAdminDto);
  }

  @ApiOperation({ summary: "returns all admins" })
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiOperation({ summary: "return admin by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(id);
  }

  @ApiOperation({ summary: "update admin by id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: "delete admin by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(id);
  }
}
