import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  signup(creds: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(creds);
  }
}
