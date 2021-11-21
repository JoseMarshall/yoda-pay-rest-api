import { Router } from 'express';

import { adaptExpressRoute } from '../../adapters/express-route-adapter';
import createAccount from '../../factories/account/create-account';
import disableAccount from '../../factories/account/disable-account';
import enableAccount from '../../factories/account/enable-account';
import getAllAccounts from '../../factories/account/list-accounts';
import updateOneAccount from '../../factories/account/update-account';

const router = Router();

router.patch('/enable', adaptExpressRoute(enableAccount));
router.patch('/disable', adaptExpressRoute(disableAccount));
router.patch('/', adaptExpressRoute(updateOneAccount));

router.get('/', adaptExpressRoute(getAllAccounts));
router.post('/', adaptExpressRoute(createAccount));

export default router;
