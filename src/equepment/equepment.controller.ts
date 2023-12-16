import { Controller, Get, Post, Body, Param, Delete, UploadedFile, UseInterceptors, Put } from "@nestjs/common";
import { EquepmentService } from "./equepment.service";
import { CreateEquepmentDto } from "./dto/create-equepment.dto";
import { UpdateEquepmentDto } from "./dto/update-equepment.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Equepments")
@Controller("equepment")
export class EquepmentController {
  constructor(private readonly equepmentService: EquepmentService) {}
  @ApiOperation({ summary: "create a new equepment" })
  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createEquepmentDto: CreateEquepmentDto, @UploadedFile() photo: Express.Multer.File) {
    return this.equepmentService.create(createEquepmentDto, photo);
  }

  @ApiOperation({ summary: "return equepments" })
  @Get()
  findAll() {
    return this.equepmentService.findAll();
  }

  @ApiOperation({ summary: "return a equepment by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.equepmentService.findOne(id);
  }

  @ApiOperation({ summary: "update a equepment by id" })
  @Put(":id")
  @UseInterceptors(FileInterceptor("photo"))
  update(@Param("id") id: string, @Body() updateEquepmentDto: UpdateEquepmentDto, photo?: Express.Multer.File) {
    return this.equepmentService.update(id, updateEquepmentDto, photo);
  }

  @ApiOperation({ summary: "delete a equepment by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.equepmentService.remove(id);
  }
}
