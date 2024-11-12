import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleInput } from 'src/Sales/dto/create-Sale.input';
import { UpdateSaleInput } from 'src/Sales/dto/update-Sale.input';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SALES_REPOSITORY')
    private SalesRepository: typeof Sale,
  ) {}
  async create(createSaleInput: CreateSaleInput): Promise<Sale> {
    return await this.SalesRepository.create({
      ...createSaleInput,
    });
  }

  async findAll(): Promise<Sale[]> {
    return await this.SalesRepository.findAll<Sale>();
  }

  async findOne(id: number): Promise<Sale> {
    return await this.SalesRepository.findOne<Sale>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Sale> {
    return await this.SalesRepository.findOne<Sale>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdateSaleInput): Promise<Sale> {
    const Sale = await this.SalesRepository.findOne({
      where: { ...where },
    });
    await Sale.update({ ...data });
    await Sale.save();
    return Sale;
  }

  async remove(id: number): Promise<Sale> {
    return await this.SalesRepository.findOne<Sale>({
      where: { id: id },
    });
  }
}
