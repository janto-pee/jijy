import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private AddresssRepository: typeof Address,
  ) {}
  async create(createAddressInput: CreateAddressInput): Promise<Address> {
    return await this.AddresssRepository.create({
      ...createAddressInput,
    });
  }

  async findAll(): Promise<Address[]> {
    return await this.AddresssRepository.findAll<Address>();
  }

  async findOne(id: number): Promise<Address> {
    return await this.AddresssRepository.findOne<Address>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Address> {
    return await this.AddresssRepository.findOne<Address>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdateAddressInput): Promise<Address> {
    const Address = await this.AddresssRepository.findOne({
      where: { ...where },
    });
    await Address.update({ ...data });
    await Address.save();
    return Address;
  }

  async remove(id: number): Promise<Address> {
    return await this.AddresssRepository.findOne<Address>({
      where: { id: id },
    });
  }
}
