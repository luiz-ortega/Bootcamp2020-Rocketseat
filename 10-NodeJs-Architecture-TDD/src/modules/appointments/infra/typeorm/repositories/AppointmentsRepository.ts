import { Repository, getRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/infra/repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({
        date,
        provider_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
