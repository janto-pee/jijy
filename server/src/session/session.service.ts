import { Inject, Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session } from './entities/session.entity';
import { User } from 'src/users/entities/user.entity';

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
    if (!session) {
      throw new Error('cannot find session');
    }
    await session.update({ valid: false });
    await session.save();
    return session;
  }
}
