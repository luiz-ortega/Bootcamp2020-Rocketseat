import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateuserService';

export default class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createuser = container.resolve(CreateUserService);

        const user = await createuser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    }
}
