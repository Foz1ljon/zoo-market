import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { AnimalTypeService } from "./animal-type.service";
import { CreateAnimalTypeDto } from "./dto/create-animal-type.dto";
import { UpdateAnimalTypeDto } from "./dto/update-animal-type.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("AnimalTypes")
@Controller("animal-type")
export class AnimalTypeController {
  constructor(private readonly animalTypeService: AnimalTypeService) {}
  @ApiOperation({ summary: "add animal type" })
  @Post()
  create(@Body() createAnimalTypeDto: CreateAnimalTypeDto) {
    return this.animalTypeService.create(createAnimalTypeDto);
  }

  @ApiOperation({ summary: "return animal types" })
  @Get()
  findAll() {
    return this.animalTypeService.findAll();
  }

  @ApiOperation({ summary: "return animal type by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.animalTypeService.findOne(id);
  }

  @ApiOperation({ summary: "update animal type by id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAnimalTypeDto: UpdateAnimalTypeDto) {
    return this.animalTypeService.update(id, updateAnimalTypeDto);
  }

  @ApiOperation({ summary: "delete animal type by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.animalTypeService.remove(id);
  }
}
