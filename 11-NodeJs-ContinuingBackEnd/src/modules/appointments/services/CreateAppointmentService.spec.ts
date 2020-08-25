import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123456',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    it('should not be able to create two appointments at the same date', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentsService(
            fakeAppointmentsRepository,
        );

        const appointmentsDate = new Date();

        await createAppointment.execute({
            date: appointmentsDate,
            provider_id: '123456',
        });

        await expect(
            createAppointment.execute({
                date: appointmentsDate,
                provider_id: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
