import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateuserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createuser = container.resolve(CreateUserService);

    const user = await createuser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
