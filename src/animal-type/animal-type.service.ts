import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAnimalTypeDto } from "./dto/create-animal-type.dto";
import { UpdateAnimalTypeDto } from "./dto/update-animal-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { AnimalType } from "./schemas/animal-type.schema";
import { Model } from "mongoose";
import { checkId } from "src/common/utils/check-mongo_id";

@Injectable()
export class AnimalTypeService {
  constructor(@InjectModel(AnimalType.name) private typeModel: Model<AnimalType>) {}

  async create(createAnimalTypeDto: CreateAnimalTypeDto) {
    const data = await this.typeModel.findOne({
      name: createAnimalTypeDto.name,
    });
    if (!data) throw new BadRequestException("Already created this type");
    return this.typeModel.create(CreateAnimalTypeDto);
  }

  findAll() {
    return this.typeModel.find();
  }

  async findOne(id: string) {
    checkId(id);
    const data = await this.typeModel.findById(id);
    if (!data) throw new NotFoundException("Not found");
    return data;
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    checkId(id);
    const data = await this.typeModel.findById(id);
    if (!data) throw new NotFoundException("Not found");
    if (updateAnimalTypeDto.name) {
      const user = await this.typeModel.findOne({
        name: updateAnimalTypeDto.name,
      });
      if (!user) throw new BadRequestException("Already created!");
      return this.typeModel.findByIdAndUpdate(id, updateAnimalTypeDto, {
        new: true,
      });
    }
    return this.typeModel.findByIdAndUpdate(id, updateAnimalTypeDto, {
      new: true,
    });
  }

  async remove(id: string) {
    checkId(id);
    const data = await this.typeModel.findById(id);
    if (!data) throw new NotFoundException("Not found");
    return this.typeModel.findByIdAndDelete(id, { new: true });
  }
}
