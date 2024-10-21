import { Inject, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { signJwt, verifyJwt } from 'src/utils/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import config from 'config';
import { get } from 'lodash';

@Injectable()
export class SessionService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private sessionRepository: typeof Session,

    private readonly userService: UsersService,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    return await this.sessionRepository.create({ ...createSessionDto });
  }

  // findAll() {
  //   return `This action returns all session`;
  // }

  async findSession(query: string) {
    const session = await this.sessionRepository.findOne({
      where: {
        id: query,
      },
    });
    return session;
  }

  async updateSession(query: string) {
    const updateUser = await this.sessionRepository.update(
      { valid: false },
      {
        where: {
          id: query,
          valid: true,
        },
      },
    );
    return updateUser;
  }

  async reIssueAccessToken(refreshToken: string) {
    const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublic');

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await this.findSession(get(decoded, 'session'));

    if (!session || !session.valid) return false;

    const user = await this.userService.findUser(session.userId);

    if (!user) return false;

    const accessToken = signJwt(
      { ...user, session: session.id },
      'accessTokenPrivate',
      { expiresIn: config.get<string>('accessTokenTtl') },
    );

    return accessToken;
  }

  // update(id: number, updateSessionDto: UpdateSessionDto) {
  //   return `This action updates a #${id} session`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} session`;
  // }
}
