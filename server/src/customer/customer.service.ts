import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private CustomersRepository: typeof Customer,
  ) {}
  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    return await this.CustomersRepository.create({
      ...createCustomerInput,
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.CustomersRepository.findAll<Customer>();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.CustomersRepository.findOne<Customer>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Customer> {
    return await this.CustomersRepository.findOne<Customer>({
      where: { email: email },
    });
  }

  async update(id: number, data: UpdateCustomerInput): Promise<Customer> {
    const Customer = await this.CustomersRepository.findOne({
      where: { id: id },
    });
    if (!Customer) {
      throw new Error('Customer not found');
    }
    await Customer.update({ ...data });
    await Customer.save();
    return Customer;
  }

  async remove(id: number): Promise<Customer> {
    const customer = await this.CustomersRepository.findOne<Customer>({
      where: { id: id },
    });
    await customer.destroy();
    return customer;
  }
}
