import { getRepository, Raw, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepositry: Repository<Appointment>;

  constructor() {
    this.ormRepositry = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepositry.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    user_id,
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepositry.create({
      user_id,
      provider_id,
      date,
    });
    await this.ormRepositry.save(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepositry.find({
      where: {
        provider_id,
        date: Raw(
          DateFieldName =>
            `to_char(${DateFieldName}, 'MM-YYYY) = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepositry.find({
      where: {
        provider_id,
        date: Raw(
          DateFieldName =>
            `to_char(${DateFieldName}, 'DD-MM-YYYY) = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}

export default AppointmentsRepository;
