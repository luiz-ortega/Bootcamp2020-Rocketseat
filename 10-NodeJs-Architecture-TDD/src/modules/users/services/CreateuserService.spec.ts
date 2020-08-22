import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateuserService from './CreateuserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateuserService(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'email@email.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateuserService(fakeUsersRepository);

        await createUser.execute({
            name: 'John Doe',
            email: 'email@email.com',
            password: '123456',
        });

        expect(
            createUser.execute({
                name: 'John Doe',
                email: 'email@email.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
