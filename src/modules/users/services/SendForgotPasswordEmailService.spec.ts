import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send a recovery password email to the specific email id', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'doe.j@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email to a non-existent user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'doe.j@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a new token for recovery password', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe.j@mail.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'doe.j@mail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
