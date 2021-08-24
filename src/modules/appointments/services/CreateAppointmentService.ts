import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date.');
    }

    if (appointmentDate.getHours() < 8 || appointmentDate.getHours() > 17) {
      throw new AppError(
        'You can not create an appointment for before 7 pm nor after 5 pm.',
      );
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an appointment with yourself');
    }

    const findAppointmentSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentSameDate) {
      throw new AppError('This time is not available');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
