import { Router } from 'express';
import {
	getHomePage,
	postAddUser,
	getLoginPage,
	getDashDoardPage,
    postLoginUser
} from '../controllers/register.controller.js';
import { auth } from '../middleware/middleweare.js';

const router = Router();

router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.post('/register', postAddUser);
router.post('/login', postLoginUser);
router.get('/dashboard', auth, getDashDoardPage);

export default router;
