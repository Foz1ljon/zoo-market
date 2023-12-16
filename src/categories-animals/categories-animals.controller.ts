import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CategoriesAnimalsService } from "./categories-animals.service";
import { CreateCategoriesAnimalDto } from "./dto/create-categories-animal.dto";
import { UpdateCategoriesAnimalDto } from "./dto/update-categories-animal.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Category")
@Controller("category")
export class CategoriesAnimalsController {
  constructor(private readonly categoriesAnimalsService: CategoriesAnimalsService) {}

  @ApiOperation({ summary: "creates a new category" })
  @Post()
  create(@Body() createCategories: CreateCategoriesAnimalDto) {
    return this.categoriesAnimalsService.create(createCategories);
  }

  @ApiOperation({ summary: "returns categories" })
  @Get()
  findAll() {
    return this.categoriesAnimalsService.findAll();
  }

  @ApiOperation({ summary: "Returns a category by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesAnimalsService.findOne(id);
  }

  @ApiOperation({ summary: "update a category by id" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCategories: UpdateCategoriesAnimalDto) {
    return this.categoriesAnimalsService.update(id, updateCategories);
  }

  @ApiOperation({ summary: "delete a category by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesAnimalsService.remove(id);
  }
}
