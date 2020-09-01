import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providerRouter = Router();

const appointmentsController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providerRouter.use(ensureAuthenticated);

providerRouter.post('/', appointmentsController.index);

providerRouter.get(
    '/:provider_id/month-availability',
    providerMonthAvailabilityController.index,
);

providerRouter.get(
    '/:provider_id/day-availability',
    providerDayAvailabilityController.index,
);

export default providerRouter;
