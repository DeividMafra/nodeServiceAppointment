import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepositry: Repository<UserToken>;

  constructor() {
    this.ormRepositry = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepositry.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepositry.create({
      user_id,
    });

    await this.ormRepositry.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
