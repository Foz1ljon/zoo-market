import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoriesAnimalDto } from "./dto/create-categories-animal.dto";
import { UpdateCategoriesAnimalDto } from "./dto/update-categories-animal.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CategoriesAnimal } from "./schemas/categories-animal.schema";
import { Model } from "mongoose";
import { checkId } from "src/common/utils/check-mongo_id";

@Injectable()
export class CategoriesAnimalsService {
  constructor(
    @InjectModel(CategoriesAnimal.name)
    private categoryModel: Model<CategoriesAnimal>,
  ) {}
  async create(createCategories: CreateCategoriesAnimalDto) {
    const category = await this.categoryModel.findOne({
      name: createCategories.name,
    });

    if (category) {
      throw new BadRequestException("Category already exists");
    }
    return this.categoryModel.create(createCategories);
  }

  findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    checkId(id);

    const data = await this.categoryModel.findById(id);

    if (!data) throw new NotFoundException("Category not found");
    return data;
  }

  async update(id: string, updateCategory: UpdateCategoriesAnimalDto) {
    checkId(id);

    const data = await this.categoryModel.findById(id);
    if (!data) throw new NotFoundException("Category not found");

    if (updateCategory.name) {
      const category = await this.categoryModel.findOne({
        name: updateCategory.name,
      });

      if (category) {
        throw new BadRequestException("Category already exists");
      }
      return this.categoryModel.findByIdAndUpdate(id, updateCategory, {
        new: true,
      });
    }

    return this.categoryModel.findByIdAndUpdate(id, updateCategory, {
      new: true,
    });
  }

  async remove(id: string) {
    checkId(id);
    const data = await this.categoryModel.findById(id);
    if (!data) throw new NotFoundException("Category not found");
  }
}
