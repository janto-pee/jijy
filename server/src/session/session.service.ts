import { Inject, Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private sessionRepository: typeof Session,
  ) {}

  async create(createSessionInput: CreateSessionInput): Promise<Session> {
    return await this.sessionRepository.create({
      ...createSessionInput,
    });
  }

  async findSession(id: number): Promise<Session> {
    return await this.sessionRepository.findOne<Session>({
      where: { id: id, valid: true },
    });
  }

  async updateSession(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id: id, valid: true },
    });
    await session.update({ valid: false });
    await session.save();
    return session;
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.sessionRepository.findOne<Session>({
  //     where: { email: email },
  //   });

  //   if (!user || user.password === null) return false;

  //   const match = await comparePassword(password, user.password);

  //   if (match) {
  //     return user;
  //   }

  //   return false;
  // }move(id: number) {
  //   return `This action removes a #${id} session`;
  // }
}
