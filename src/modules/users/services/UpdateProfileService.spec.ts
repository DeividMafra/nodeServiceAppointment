import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Mary Doe',
      email: 'doe.m@mail.com',
    });

    expect(updatedUser?.name).toBe('Mary Doe');
    expect(updatedUser?.email).toBe('doe.m@mail.com');
  });

  it('should not be able to update the email id to an email id already in our database', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mary Doe',
        email: 'doe.j@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Mary Doe',
      email: 'doe.m@mail.com',
      old_password: '123123',
      password: '123456',
    });

    expect(updatedUser?.password).toBe('123456');
  });

  it('should be able to update the password only when informing the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mary Doe',
        email: 'doe.m@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password only when informing the old password correctly', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Mary Doe',
        email: 'doe.m@mail.com',
        old_password: 'wrong_old_password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to upadte the user profile of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'non-existing-name',
        email: 'non-existing-email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
