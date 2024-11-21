import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { Payment } from './entities/payment.entity';

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

  async update(id: number, data: UpdatePaymentInput): Promise<Payment> {
    const Payment = await this.PaymentsRepository.findOne({
      where: { id: id },
    });
    if (!Payment) {
      throw new Error('Payment not found');
    }
    await Payment.update({ ...data });
    await Payment.save();
    return Payment;
  }

  async remove(id: number): Promise<Payment> {
    const payment = await this.PaymentsRepository.findOne<Payment>({
      where: { id: id },
    });
    await payment.destroy();
    return payment;
  }
}
