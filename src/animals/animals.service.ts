import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Animal } from "./schemas/animal.schema";
import { Model } from "mongoose";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { checkId } from "src/common/utils/check-mongo_id";
import { AnimalType } from "src/animal-type/schemas/animal-type.schema";
import { CategoriesAnimal } from "src/categories-animals/schemas/categories-animal.schema";

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<Animal>,
    @InjectModel(AnimalType.name) private typeModel: Model<AnimalType>,
    @InjectModel(CategoriesAnimal.name) private categoryModel: Model<CategoriesAnimal>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(createAnimalDto: CreateAnimalDto, photo: Express.Multer.File) {
    if (!photo) throw new BadRequestException("Photo is required!");
    const image = await this.cloudinaryService.uploadImage(photo).catch((err) => {
      console.log(err.message);
      throw new BadRequestException("Invalid file type!");
    });

    createAnimalDto.photo = image.url;
    checkId(createAnimalDto.category);
    checkId(createAnimalDto.type);

    const type = await this.typeModel.findById(createAnimalDto.type);
    const category = await this.categoryModel.findById(createAnimalDto.category);
    if (!type) throw new NotFoundException("Type  not found");
    if (!category) throw new NotFoundException("Category  not found");

    return this.animalModel.create(createAnimalDto);
  }

  findAll() {
    // Add search animals

    return this.animalModel.find();
  }

  async findById(id: string) {
    checkId(id);
    const animal = await this.animalModel.findById(id);
    if (!animal) throw new NotFoundException("Animal not found");
    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto, photo: Express.Multer.File) {
    checkId(id);
    const animal = await this.animalModel.findById(id);
    if (!animal) throw new NotFoundException("Animal not found");

    if (photo) {
      updateAnimalDto.photo = (await this.cloudinaryService.uploadImage(photo)).url;
    }
    if (updateAnimalDto.category) {
      checkId(updateAnimalDto.category);
      const category = await this.categoryModel.findById(updateAnimalDto.category);
      if (!category) throw new NotFoundException("Category not found");
    }
    if (updateAnimalDto.type) {
      checkId(updateAnimalDto.type);
      const type = await this.typeModel.findById(updateAnimalDto.type);
      if (!type) throw new NotFoundException("Type not found");
    }

    return this.animalModel.findByIdAndUpdate(id, updateAnimalDto, { new: true });
  }

  async remove(id: string) {
    checkId(id);
    const animal = await this.animalModel.findById(id);
    if (!animal) throw new NotFoundException("Animal not found");
    return this.animalModel.findByIdAndDelete(id, { new: true });
  }
}
