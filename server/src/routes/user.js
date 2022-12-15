import express from 'express';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { update } from '../controllers/user';

router.put('/update-user/:userId', requireSignin, update);

module.exports = router;