// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateuserService';

describe('Authenticate User', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);
        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
        );

        await createUser.execute({
            name: 'Joe Doe',
            email: 'email@email.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'email@email.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });
});
