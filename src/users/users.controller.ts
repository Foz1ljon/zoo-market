import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Users")
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "register a new user" })
  @Post("register")
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.create(registerUserDto);
  }

  @ApiOperation({ summary: "login a user" })
  @Post("login")
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiOperation({ summary: "return users" })
  @Get("users")
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "return a user by id" })
  @Get("profile/:id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "update a user by id" })
  @Patch("profile/:id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "delete a user by id" })
  @Delete("profile/:id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
