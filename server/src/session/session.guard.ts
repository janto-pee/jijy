import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyJwt } from 'src/utils/jwt';
import { get } from 'lodash';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const Authorization = request.get('Authorization');
    try {
      if (Authorization) {
        const token = Authorization.replace('Bearer ', '');

        const decoded = verifyJwt<{ session: string }>(
          token,
          'accessTokenPublic',
        );
        console.log('decoded .......................', decoded.session);

        request['session'] = decoded;
        console.log(request.session);
        return decoded.session;
      }
    } catch {
      throw new UnauthorizedException();
    }
    console.log('we got here too');
    // return true;
  }

  //   private extractTokenFromHeader(
  //     request: Request,
  //     response: Response,
  //   ): string | undefined {
  //     const accessToken = get(request, 'headers.authorization', '').replace(
  //       /^Bearer\s/,
  //       '',
  //     );
  //     console.log(
  //       'accessToken in extractfrom heder ...........................',
  //       accessToken,
  //     );
  //     const userId = response.locals.user._id;
  //     console.log('request.................', request, userId);
  //     const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //     return type === 'Bearer' ? token : undefined;
  //   }
}
