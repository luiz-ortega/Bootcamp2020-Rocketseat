import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateuserService from './CreateuserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateuserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateuserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'email@email.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new with same email from another', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'email@email.com',
            password: '123456',
        });

        await expect(
            createUser.execute({
                name: 'John Doe',
                email: 'email@email.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
