import express from 'express';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { specialities, add, update, remove, restaurantsBySpeciality } from '../controllers/speciality';

router.get('/specialities', specialities);
router.get('/speciality-restaurants/:specialityId', restaurantsBySpeciality);
router.post('/add-speciality', add);
router.put('/update-speciality/:specialityId', requireSignin, update);
router.delete('/delete-speciality/:specialityId', requireSignin, remove);

module.exports = router;