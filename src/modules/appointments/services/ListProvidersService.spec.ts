import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Mary Doe',
      email: 'doe.m@mail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'user.l@mail.com',
      password: '123123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
