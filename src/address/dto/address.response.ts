import { Address } from '../entities/address.entity';

export class AddressDto {
  declare id: string;
  street: string;
  street2: string;
  city: string;
  state_province_code: string;
  state_province_name: string;
  postal_code: string;
  country_code: string;
  location: string;
  country: string;
  declare userId: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  constructor(address: Address) {
    this.id = address.id;
    this.street = address.street;
    this.street2 = address.street2;
    this.city = address.city;
    this.state_province_code = address.state_province_code;
    this.state_province_name = address.state_province_name;
    this.postal_code = address.postal_code;
    this.country_code = address.country_code;
    this.location = address.location;
    this.country = address.country;
    this.userId = address.userId;
    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
  }
}
