import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceEntity } from './entities/province.entity';
import { DistrictEntity } from './entities/district.entity';
import { WardEntity } from './entities/ward.entity';
import { LocationEntity } from './entities/location.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    @InjectRepository(ProvinceEntity)
    private provinceRepository: Repository<ProvinceEntity>,
    @InjectRepository(DistrictEntity)
    private districtRepository: Repository<DistrictEntity>,
    @InjectRepository(WardEntity)
    private wardRepository: Repository<WardEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<any> {
    try {
      const entity = this.classMapper.map(
        createLocationDto,
        CreateLocationDto,
        LocationEntity,
      );
      return this.classMapper.mapAsync(
        await this.locationRepository.save(entity),
        LocationEntity,
        CreateLocationDto,
      );
    } catch (ex) {
      throw new Error(`create error: ${ex.message}.`);
    }
  }

  private async findProvinceById(id: string): Promise<ProvinceEntity> {
    return this.provinceRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  private async findDistrictById(id: string): Promise<DistrictEntity> {
    return this.districtRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  private async findWardById(id: string): Promise<WardEntity> {
    return this.wardRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll() {
    const res = await this.locationRepository.find();
    return res ? res : 'No location found!';
  }

  async findOne(id: string) {
    const res = await this.locationRepository.findOne({
      where: {
        id: id,
      },
    });
    return res ? res : 'Location not found!';
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const entity = this.classMapper.map(
      updateLocationDto,
      UpdateLocationDto,
      LocationEntity,
    );

    const res = await this.locationRepository.update(
      {
        id: id,
      },
      entity,
    );

    return res.affected > 0
      ? await this.locationRepository.findOne({
          where: {
            id: id,
          },
        })
      : 'Location not found!';
  }

  async remove(id: string) {
    const res = await this.locationRepository.delete({
      id: id,
    });

    return res.affected > 0
      ? 'Location deleted successfully!'
      : 'Location not found!';
  }

  async findByDistrict(id: string) {
    const res = await this.districtRepository.find({
      where: {
        id: id,
      },
    });

    return res ? res : 'No district found!';
  }

  async findByProvince(id: string) {
    const res = await this.provinceRepository.find({
      where: {
        id: id,
      },
    });

    return res ? res : 'No province found!';
  }

  async findByWard(id: string) {
    const res = await this.wardRepository.find({
      where: {
        id: id,
      },
    });

    return res ? res : 'No ward found!';
  }

  async findAllProvince() {
    const res = await this.provinceRepository.find();
    return res ? res : 'No province found!';
  }

  async findAllDistrict() {
    const res = await this.districtRepository.find();
    return res ? res : 'No district found!';
  }

  async findAllWard() {
    const res = await this.wardRepository.find();
    return res ? res : 'No ward found!';
  }
}
