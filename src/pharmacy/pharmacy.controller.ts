import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { PharmacyService } from "./pharmacy.service";
import { CreatePharmacyDto } from "./dto/create-pharmacy.dto";
import { UpdatePharmacyDto } from "./dto/update-pharmacy.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Pharmacys")
@Controller("pharmacy")
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}
  @ApiOperation({ summary: "Create a new pharmacy" })
  @Post()
  create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return this.pharmacyService.create(createPharmacyDto);
  }

  @ApiOperation({ summary: "return pharmacys" })
  @Get()
  findAll() {
    return this.pharmacyService.findAll();
  }

  @ApiOperation({ summary: "return a pharmacy by id" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pharmacyService.findOne(id);
  }

  @ApiOperation({ summary: "update a pharmacy by id" })
  @Put(":id")
  update(@Param("id") id: string, @Body() updatePharmacyDto: UpdatePharmacyDto) {
    return this.pharmacyService.update(id, updatePharmacyDto);
  }

  @ApiOperation({ summary: "delete a pharmacy by id" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pharmacyService.remove(id);
  }
}
