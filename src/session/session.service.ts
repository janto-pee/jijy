import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOne({ email: email });

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      // Remove password from returned user object
      const { password: _, ...result } = user.dataValues;
      return result;
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`, error.stack);
      return null;
    }
  }

  async login(loginInput: LoginInput) {
    try {
      this.logger.log(`User logging in: ${loginInput.email || 'Untitled'}`);
      const { email, password } = loginInput;

      const user = await this.validateUser(email, password);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        shopId: user.shopId,
      };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: jwtConstants.refreshExpiresIn },
      );

      // Update user's refresh token in database (optional)
      // await this.userService.updateRefreshToken(user.id, refreshToken);

      return {
        success: true,
        message: 'Login successful',
        accessToken,
        refreshToken,
        user,
      };
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async register(registerInput: RegisterInput) {
    try {
      // Check if user already exists
      const existingUser = await this.userService
        .findOne({ email: registerInput.email })
        .catch(() => null);

      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(registerInput.password, salt);

      // Create new user
      const newUser = await this.userService.create({
        ...registerInput,
        password: hashedPassword,
        role: UserRole.USER,
      });

      // Remove password from returned user object
      const { password: _, ...result } = newUser.dataValues;

      // Generate tokens
      const payload = {
        sub: result.id,
        email: result.email,
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
        role: result.role,
      };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(
        { sub: result.id },
        { expiresIn: jwtConstants.refreshExpiresIn },
      );

      return {
        success: true,
        message: 'Registration successful',
        accessToken,
        refreshToken,
        user: result,
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  async refreshToken(token: string) {
    try {
      // Verify refresh token
      const decoded = this.jwtService.verify(token);

      // Get user from database
      const user = await this.userService.findOne(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new access token
      const payload = {
        sub: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        success: true,
        message: 'Token refreshed successfully',
        accessToken,
      };
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    try {
      // Optional: Clear refresh token in database
      // await this.userService.updateRefreshToken(userId, null);

      return {
        success: true,
        message: 'Logout successful',
      };
    } catch (error) {
      this.logger.error(`Logout failed: ${error.message}`, error.stack);
      throw error;
    }
  }
}

// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateSessionInput } from './dto/create-session.input';
// import { User } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constants';

// @Injectable()
// export class SessionService {
//   constructor(
//     private usersService: UserService,
//     private jwtService: JwtService,
//   ) {}

//   async signIn(email: string, pass: string): Promise<any> {
//     const user = await this.usersService.findEmail(email);
//     if (user?.dataValues.password !== pass) {
//       throw new UnauthorizedException();
//     }
//     const { password, ...result } = user;
//     // TODO: Generate a JWT and return it here
//     // instead of the user object
//     const payload = { sub: result.id, resultname: user.username };
//     return {
//       access_token: await this.jwtService.signAsync(payload, {
//         secret: jwtConstants.secret,
//       }),
//     };
//   }
// }
