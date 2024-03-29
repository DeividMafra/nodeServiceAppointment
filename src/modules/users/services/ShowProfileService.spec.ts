import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('doe.j@mail.com');
  });

  it('should not be able to show the user profile of a non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
