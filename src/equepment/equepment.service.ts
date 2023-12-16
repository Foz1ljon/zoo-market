import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateEquepmentDto } from "./dto/create-equepment.dto";
import { UpdateEquepmentDto } from "./dto/update-equepment.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Equepment } from "./schemas/equepment.schema";
import { Model } from "mongoose";
import { Animal } from "src/animals/schemas/animal.schema";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { checkId } from "src/common/utils/check-mongo_id";

@Injectable()
export class EquepmentService {
  constructor(
    @InjectModel(Equepment.name) private equepmentModel: Model<Equepment>,
    @InjectModel(Animal.name) private animalModel: Model<Animal>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createEquepmentDto: CreateEquepmentDto, photo: Express.Multer.File) {
    if (!photo) throw new BadRequestException("Photo is required");
    checkId(createEquepmentDto.animal);
    const animal = await this.animalModel.findById(createEquepmentDto.animal);
    if (!animal) throw new NotFoundException("Animal not found");

    createEquepmentDto.photo = (await this.cloudinaryService.uploadImage(photo)).url;

    return this.equepmentModel.create(createEquepmentDto);
  }

  findAll() {
    return this.equepmentModel.find();
  }

  async findOne(id: string) {
    checkId(id);
    const data = await this.equepmentModel.findById(id);
    if (!data) throw new NotFoundException("Equepment not found");

    return data;
  }

  async update(id: string, updateEquepmentDto: UpdateEquepmentDto, photo: Express.Multer.File) {
    checkId(id);
    const data = await this.equepmentModel.findById(id);
    if (!data) throw new NotFoundException("Equepment not found");
    if (photo) {
      updateEquepmentDto.photo = (await this.cloudinaryService.uploadImage(photo)).url;
    }
    if (updateEquepmentDto.animal) {
      checkId(updateEquepmentDto.animal);
      const animal = await this.animalModel.findById(updateEquepmentDto.animal);
      if (!animal) throw new NotFoundException(`Animal not found`);
    }

    return this.equepmentModel.findByIdAndUpdate(id, updateEquepmentDto, { new: true });
  }

  async remove(id: string) {
    checkId(id);
    const data = await this.equepmentModel.findById(id);
    if (!data) throw new NotFoundException("Equepment not found");

    return this.equepmentModel.findByIdAndDelete(id, { new: true });
  }
}
