import { signJwt, verifyJwt } from 'src/utils/jwt';
import { get } from 'lodash';
import config from 'config';
import { Session } from 'src/session/entities/session.entity';
import { User } from 'src/users/entities/user.entity';

export async function reIssueAccessToken(refreshToken: string) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublic');

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await Session.findOne({
    where: { id: get(decoded, 'session') },
  });

  if (!session || !session.valid) return false;

  const user = await User.findOne({ where: { id: session.userId } });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.id },
    'accessTokenPrivate',
    { expiresIn: config.get<string>('accessTokenTtl') },
  );

  return accessToken;
}
