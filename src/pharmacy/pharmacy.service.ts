import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePharmacyDto } from "./dto/create-pharmacy.dto";
import { UpdatePharmacyDto } from "./dto/update-pharmacy.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Pharmacy } from "./schemas/pharmacy.schema";
import { Model } from "mongoose";
import { Animal } from "src/animals/schemas/animal.schema";
import { checkId } from "src/common/utils/check-mongo_id";

@Injectable()
export class PharmacyService {
  constructor(
    @InjectModel(Pharmacy.name) private pharmacyModel: Model<Pharmacy>,
    @InjectModel(Animal.name) private animalModel: Model<Animal>,
  ) {}

  async create(createPharmacyDto: CreatePharmacyDto) {
    const { animal } = createPharmacyDto;
    checkId(animal);
    const data = await this.animalModel.findById(animal);
    if (!data) throw new NotFoundException("Animal not found");

    return this.pharmacyModel.create(createPharmacyDto);
  }

  findAll() {
    return this.pharmacyModel.find();
  }

  async findOne(id: string) {
    checkId(id);
    const data = await this.pharmacyModel.findById(id);
    if (!data) throw new NotFoundException("Pharmacy not found");
  }

  async update(id: string, updatePharmacyDto: UpdatePharmacyDto) {
    checkId(id);
    const data = await this.pharmacyModel.findById(id);
    if (!data) throw new NotFoundException("Pharmacy not found");
    if (updatePharmacyDto.animal) {
      checkId(updatePharmacyDto.animal);
      const animal = await this.animalModel.findById(updatePharmacyDto.animal);
      if (!animal) throw new NotFoundException("Animal not found");
    }

    return this.pharmacyModel.findByIdAndUpdate(id, updatePharmacyDto, { new: true });
  }

  async remove(id: string) {
    checkId(id);
    const data = await this.pharmacyModel.findById(id);
    if (!data) throw new NotFoundException("Pharmacy not found");

    return this.pharmacyModel.findByIdAndDelete(id, { new: true });
  }
}
