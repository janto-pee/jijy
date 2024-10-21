import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Request, Response } from 'express';
import { createSessionInput } from './session.schema';
import { UsersService } from 'src/users/users.service';
import { signJwt } from 'src/utils/jwt';
import config from 'config';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }
  async CreateSessionHandler(
    req: Request<{}, {}, createSessionInput['body']>,
    res: Response,
  ) {
    try {
      const { email, hashed_password } = req.body;
      const user = await this.usersService.validateUser(email, hashed_password);
      console.log(user);

      if (!user) {
        res.status(400).send(`user not found`);
        return;
      }

      const userAgent = req.get('userAgent') || '';
      const session = await this.sessionService.create({
        userId: user.id,
        userAgent: userAgent,
      });

      //   generate access and refresh token
      const accessToken = signJwt(
        { ...user, session: session.id },
        'accessTokenPrivate',
        { expiresIn: config.get<string>('accessTokenTtl') },
      );

      const refreshToken = signJwt(
        { ...user, session: session.id },
        'refreshTokenPrivate',
        { expiresIn: config.get<string>('refreshTokenTtl') },
      );

      res.status(200).send({
        session,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }

  async findSessionHandler(req: Request, res: Response) {
    try {
      const id = res.locals.user.session;
      const session = await this.sessionService.findSession(id);
      res.status(201).json({
        status: true,
        message: 'session found',
        data: session,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }

  async deleteSessionHandler(req: Request, res: Response) {
    try {
      const id = res.locals.user.id;
      const user = await this.sessionService.updateSession(id);
      res.status(201).json({
        status: true,
        message: 'session expired',
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }

  // @Get()
  // findAll() {
  //   return this.sessionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sessionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
  //   return this.sessionService.update(+id, updateSessionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sessionService.remove(+id);
  // }
}
