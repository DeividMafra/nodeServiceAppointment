import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepositry: Repository<User>;

  constructor() {
    this.ormRepositry = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepositry.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepositry.findOne({
      where: { email },
    });
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepositry.create(userData);

    await this.ormRepositry.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepositry.save(user);
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepositry.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepositry.find();
    }

    return users;
  }
}

export default UsersRepository;
