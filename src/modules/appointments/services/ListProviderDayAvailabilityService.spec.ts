// import AppError from '@shared/errors/AppError';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the provider day availability', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021, 4, 20, 11, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 13).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user_id',
      day: 20,
      year: 2021,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: true },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
