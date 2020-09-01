import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerAppointmentsController = new ProviderAppointmentsController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/me', providerAppointmentsController.index);

export default providersRouter;
