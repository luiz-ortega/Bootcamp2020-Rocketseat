// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProvider', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Joe Doe',
            email: 'email@email.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Joe Trê',
            email: 'email2@email.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Joe Qua',
            email: 'email3@email.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
