import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should create an user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not allow create an user with an existent email id', async () => {
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
