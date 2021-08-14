import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should create an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not allow create an user with an existent email id', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'doe.j@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
