import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';

type Ctx = {
  req: Request & {
    user?: Pick<User, 'id' | 'username' | 'email' | 'first_name' | 'last_name'>;
  };
  res: Response;
};

export default Ctx;
