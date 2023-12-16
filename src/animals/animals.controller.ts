import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AnimalsService } from "./animals.service";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Animals")
@Controller("animals")
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @ApiOperation({ summary: "create an new animal" })
  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createAnimalDto: CreateAnimalDto, @UploadedFile() photo: Express.Multer.File) {
    return this.animalsService.create(createAnimalDto, photo);
  }

  @ApiOperation({ summary: "returns animals" })
  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @ApiOperation({ summary: "return animal by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.animalsService.findById(id);
  }

  @ApiOperation({ summary: "update animal by id" })
  @Patch(":id")
  @UseInterceptors(FileInterceptor("photo"))
  update(
    @Param("id") id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.animalsService.update(id, updateAnimalDto, photo);
  }

  @ApiOperation({ summary: "delete animal by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.animalsService.remove(id);
  }
}
