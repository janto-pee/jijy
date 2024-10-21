import { omit } from 'lodash';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import sendEmail from 'src/utils/sendEmail';
import { Request, Response } from 'express';
import { customAlphabet } from 'nanoid';
import { hashPassword } from 'src/utils/hashPassword';
import {
  createUserInput,
  forgotPasswordInput,
  resetPasswordInput,
  verifyUserInput,
} from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/api/users')
  async create(
    request: Request<{}, {}, createUserInput['body']>,
    response: Response,
  ) {
    try {
      const nanoid = customAlphabet('0123456789abcdefgh');
      const verificationcode = nanoid(5);
      const newPayload = omit(request.body, 'confirm_password');
      const user = await this.usersService.createUser({
        ...newPayload,
        verificationCode: verificationcode,
      });
      await sendEmail({
        from: `"Jobby Recruitment Platform 👻" <lakabosch@gmail.com>`,
        to: user.email,
        subject: 'Kindly verify your email ✔',
        text: `click on the link http://localhost:1337/api/users/verify/${user.id}/${user.verificationCode}`,
        html: `<b>Hello, click on the link http://localhost:1337/api/users/verify/${user.id}/${user.verificationCode}</b>`,
      });

      response.status(201).json({
        status: true,
        message: `User Successfully Created http://localhost:1337/api/users/verify/${user.id}/${user.verificationCode}`,
        data: user,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }

  @Get('/api/users')
  findAll() {
    return this.usersService.findUsers();
  }

  @Get('/api/users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  async verifyUserHandler(
    req: Request<verifyUserInput['params']>,
    res: Response,
  ) {
    try {
      const { id, verificationcode } = req.params;
      console.log(id);
      const user = await this.usersService.findUser(id);
      if (!user) {
        res.send('could not find user');
        return;
      }
      if (user.is_email_verified) {
        res.send('user already verified');
        return;
      }

      if (user.verificationCode === verificationcode) {
        user.is_email_verified = true;
        await user.save();
        res.status(201).send('user successfully verified');
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }

  async forgotPasswordHandler(
    req: Request<{}, {}, forgotPasswordInput['body']>,
    res: Response,
  ) {
    try {
      const nanoid = customAlphabet('0123456789abcdefgh');
      const { email } = req.body;
      const user = await this.usersService.findEmail(email);
      if (!user) {
        res.send('could not find user');
        return;
      }
      if (!user.is_email_verified) {
        res.send('please verify first');
        return;
      }
      const pRC = nanoid();
      user.passwordResetCode = pRC;
      const updatedUser = await user.save();
      await sendEmail({
        from: `"Jobby Recruitment Platform 👻" <lakabosch@gmail.com>`,
        to: user.email,
        subject: 'Kindly verify your email ✔',
        // text: `verification code: ${user.verificationCode}. username: ${user.username}`,
        text: `click on the link http://localhost:1337/api/users/passwordreset/${updatedUser.id}/${pRC}`,
        html: '<b>Hello world?</b>',
      });

      // console.log
      res.status(201).json({
        status: true,
        message: `please check your email to reset password http://localhost:1337/api/users/passwordreset/${updatedUser.id}/${pRC}`,
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

  async passwordResetHandler(
    req: Request<resetPasswordInput['params'], {}, resetPasswordInput['body']>,
    res: Response,
  ) {
    try {
      const { id, passwordresetcode } = req.params;
      const { password } = req.body;
      const user = await this.usersService.findUser(id);
      if (
        !user ||
        !user.passwordResetCode ||
        user.passwordResetCode !== passwordresetcode
      ) {
        res.sendStatus(400);
        return;
      }
      const hashed_password = await hashPassword(password);
      user.hashed_password = hashed_password;
      const updatedUser = await user.save();

      res.status(201).json({
        status: true,
        message: 'password changed successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: 'server error',
      });
    }
  }

  async getCurrentUserHandler(req: Request, res: Response) {
    try {
      res.status(201).send(res.locals.user);
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }
}
