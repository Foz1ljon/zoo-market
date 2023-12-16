import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AddAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import { Model, isValidObjectId } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { checkId } from "src/common/utils/check-mongo_id";

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  getToken(data: any) {
    const payload = {
      id: data._id,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async create(addAdminDto: AddAdminDto) {
    const admin = await this.adminModel.findOne({
      phone_number: addAdminDto.phone_number,
    });
    if (admin) throw new BadRequestException("This phone number is already taken");

    addAdminDto.password = await bcrypt.hash(addAdminDto.password, 7);

    const data = await this.adminModel.create(addAdminDto);

    return this.getToken(data);
  }

  async login(loginAdminDto: LoginAdminDto) {
    const { phone_number, password } = loginAdminDto;
    const admin = await this.adminModel.findOne({ phone_number });
    if (!admin) throw new BadRequestException("Invalid phone number or password");

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) throw new BadRequestException("Invalid phone number or password");

    return this.getToken(admin);
  }
  findAll() {
    return this.adminModel.find().select("-password");
  }

  async findOne(id: string) {
    checkId(id);
    const admin = await this.adminModel.findById(id).select("-password");
    if (!admin) throw new NotFoundException("Admin not found");
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    checkId(id);
    const admin = await this.adminModel.findById(id);

    if (!admin) throw new NotFoundException("Admin not found");

    if (updateAdminDto.password) updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 7);

    if (updateAdminDto?.phone_number) {
      const admin = await this.adminModel.findOne({
        phone_number: updateAdminDto.phone_number,
      });
      if (admin) throw new BadRequestException("This phone number is already taken");
      return this.adminModel
        .findByIdAndUpdate(id, updateAdminDto, {
          new: true,
        })
        .select("-password");
    }
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).select("-password");
  }

  async remove(id: string) {
    checkId(id);
    const admin = await this.adminModel.findById(id);
    if (!admin) throw new NotFoundException("Admin not found");

    return this.adminModel.findByIdAndDelete(id, { new: true });
  }
}
