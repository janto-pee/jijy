import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleInput } from 'src/sales/dto/create-sale.input';
import { UpdateSaleInput } from 'src/sales/dto/update-sale.input';
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

  async update(id: number, data: UpdateSaleInput): Promise<Sale> {
    const Sale = await this.SalesRepository.findOne({
      where: { id: id },
    });
    if (!Sale) {
      throw new Error('Sale not found');
    }
    await Sale.update({ ...data });
    await Sale.save();
    return Sale;
  }

  async remove(id: number): Promise<Sale> {
    const sales = await this.SalesRepository.findOne<Sale>({
      where: { id: id },
    });
    await sales.destroy();
    return sales;
  }
}
