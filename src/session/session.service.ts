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

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.findAll<Session>();
  }

  async findOne(id: string): Promise<Session> {
    const Session = await this.sessionRepository.findOne<Session>({
      where: { id: id },
    });
    if (!Session) {
      throw new Error('Session not found');
    }
    return Session;
  }

  async findEmail(email: string): Promise<Session> {
    const Session = await this.sessionRepository.findOne<Session>({
      where: { email: email },
    });
    if (!Session) {
      throw new Error('Session not found');
    }
    return Session;
  }

  async update(id: string, data: UpdateSessionInput): Promise<Session> {
    const Session = await this.sessionRepository.findOne({
      where: { id: id },
    });
    if (!Session) {
      throw new Error('Sessions not found');
    }
    await Session.update({ ...data });
    await Session.save();
    return Session;
  }

  async remove(id: string): Promise<Session> {
    const Session = await this.sessionRepository.findOne<Session>({
      where: { id: id },
    });
    if (!Session) {
      throw new Error('Session not found');
    }
    await Session.destroy();
    return Session;
  }
}
