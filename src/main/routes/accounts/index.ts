import { Router } from 'express';

import { adaptExpressRoute } from '../../adapters/express-route-adapter';
import createAccount from '../../factories/account/create-account';
import disableAccount from '../../factories/account/disable-account';
import enableAccount from '../../factories/account/enable-account';
import getAllAccounts from '../../factories/account/list-accounts';
import updateOneAccount from '../../factories/account/update-account';

const router = Router();

router.put('/enable', adaptExpressRoute(enableAccount));
router.put('/disable', adaptExpressRoute(disableAccount));
router.put('/update', adaptExpressRoute(updateOneAccount));

router.get('/', adaptExpressRoute(getAllAccounts));

router.post('/', adaptExpressRoute(createAccount));

export default router;
