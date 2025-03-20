import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addresssRepository: typeof Address,
  ) {}
  async create(createAddressInput: CreateAddressInput): Promise<Address> {
    return await this.addresssRepository.create({
      ...createAddressInput,
    });
  }

  async findAll(): Promise<Address[]> {
    return await this.addresssRepository.findAll<Address>({ raw: true });
  }

  async findOne(id: string) {
    return await this.addresssRepository.findOne<Address>({
      where: { id: id },
    });
  }
  async findBy(search: any) {
    return await this.addresssRepository.findOne<Address>({
      where: { userId: search },
    });
  }

  async findEmail(email: string) {
    return await this.addresssRepository.findOne<Address>({
      where: { email: email },
    });
  }

  async update(id: string, data: UpdateAddressInput): Promise<Address> {
    const Address = await this.addresssRepository.findOne({
      where: { id: id },
    });
    console.log('id', id, 'address...', Address, 'data', data);
    if (!Address) {
      throw new Error('unable to find address');
    }
    await Address.update({ ...data });
    await Address.save();
    return Address;
  }

  async remove(id: string): Promise<Address> {
    const address = await this.addresssRepository.findOne<Address>({
      where: { id: id },
    });
    if (!address) {
      throw new Error('address not found');
    }
    await address.destroy();
    return address;
  }
}
