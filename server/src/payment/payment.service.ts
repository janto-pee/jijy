import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentInput } from './dto/create-Payment.input';
import { UpdatePaymentInput } from './dto/update-Payment.input';
import { Payment } from './entities/Payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private PaymentsRepository: typeof Payment,
  ) {}
  async create(createPaymentInput: CreatePaymentInput): Promise<Payment> {
    return await this.PaymentsRepository.create({
      ...createPaymentInput,
    });
  }

  async findAll(): Promise<Payment[]> {
    return await this.PaymentsRepository.findAll<Payment>();
  }

  async findOne(id: number): Promise<Payment> {
    return await this.PaymentsRepository.findOne<Payment>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Payment> {
    return await this.PaymentsRepository.findOne<Payment>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdatePaymentInput): Promise<Payment> {
    const Payment = await this.PaymentsRepository.findOne({
      where: { ...where },
    });
    await Payment.update({ ...data });
    await Payment.save();
    return Payment;
  }

  async remove(id: number): Promise<Payment> {
    return await this.PaymentsRepository.findOne<Payment>({
      where: { id: id },
    });
  }
}
