import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export enum UserErrors {
  duplicateUsername = '23505',
}

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(creds: AuthCredentialsDto): Promise<void> {
    const { username, password } = creds;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: passwordHash,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === UserErrors.duplicateUsername) {
        throw new ConflictException('This username already exists!');
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
