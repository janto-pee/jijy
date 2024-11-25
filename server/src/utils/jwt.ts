import * as jwt from 'jsonwebtoken';

export function signJwt(
  object: Object,
  privateKey: 'accessTokenPrivate' | 'refreshTokenPrivate',
  options?: jwt.SignOptions | undefined,
) {
  try {
    let signInKey;
    if (privateKey == 'accessTokenPrivate') {
      signInKey = process.env.ACCESS_TOKEN_PRIVATE;
    }
    if (privateKey == 'refreshTokenPrivate') {
      signInKey = process.env.REFRESH_TOKEN_PRIVATE;
    }
    return jwt.sign(object, signInKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  } catch (error) {
    return error;
  }
}

export function verifyJwt<T>(
  token: string,
  publicKey: 'accessTokenPublic' | 'refreshTokenPublic',
): T | null {
  try {
    let signInKey;
    if (publicKey == 'accessTokenPublic') {
      signInKey = process.env.ACCESS_TOKEN_PUBLIC;
    }
    if (publicKey == 'refreshTokenPublic') {
      signInKey = process.env.REFRESH_TOKEN_PUBLIC;
    }
    const decoded = jwt.verify(token, signInKey) as T;

    return decoded;
  } catch (error: any) {
    return null;
  }
}
