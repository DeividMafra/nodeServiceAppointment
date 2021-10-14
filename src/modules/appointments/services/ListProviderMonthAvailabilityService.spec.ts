import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the provider month availability', async () => {
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 8, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 9, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 10, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 11, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 12, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 13, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 15, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 16, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 20, 17, 0, 0),
    });
    await fakeAppointmentRepository.create({
      user_id: 'user_id',
      provider_id: 'user_id',
      date: new Date(2021, 9, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user_id',
      year: 2021,
      month: 10,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
