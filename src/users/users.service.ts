import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginAdminDto } from "src/admins/dto/login-admin.dto";
import { checkId } from "src/common/utils/check-mongo_id";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  getToken(data: any) {
    const payload = {
      id: data._id,
      super: data.super,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async create(registerUserDto: RegisterUserDto) {
    const { phone_number, email } = registerUserDto;
    const data = await this.userModel.findOne({ phone_number, email });
    if (data) throw new BadRequestException("User already exists");

    registerUserDto.password = await bcrypt.hash(registerUserDto.password, 7);

    const user = await this.userModel.create(registerUserDto);

    return this.getToken(user);
  }

  async login(loginUserDto: LoginAdminDto) {
    const data = await this.userModel.findOne({
      phone_number: loginUserDto.phone_number,
    });
    const isMatch = await bcrypt.compare(loginUserDto.password, data.password);

    if (!data || !isMatch) throw new BadRequestException("Invalid phone number or password");
  }

  findAll() {
    return this.userModel.find().select("-password");
  }

  async findOne(id: string) {
    checkId(id);
    const user = await this.userModel.findById(id).select("-password");
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    checkId(id);
    const user = await this.userModel.findById(id).select("-password");
    if (!user) throw new NotFoundException("User not found");
    if (updateUserDto.password) updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
    if (updateUserDto.phone_number) {
      const data = await this.userModel.findOne({
        phone_number: updateUserDto.phone_number,
      });
      if (data) throw new BadRequestException("Phone number already exists");
    }
    if (updateUserDto.email) {
      const data = await this.userModel.findOne({
        email: updateUserDto.email,
      });
      if (data) throw new BadRequestException("Email already exists");
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string) {
    checkId(id);
    const user = await this.userModel.findById(id).select("-password");
    if (!user) throw new NotFoundException("User not found");
    return this.userModel.findByIdAndDelete(id, { new: true });
  }
}
