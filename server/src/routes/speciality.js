import express from 'express';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { specialities, speciality, add, update, remove, restaurantsBySpeciality } from '../controllers/speciality';

router.get('/specialities', requireSignin, specialities);
router.get('/speciality/:specialityId', requireSignin, speciality);
router.get('/speciality-restaurants/:specialityId', requireSignin, restaurantsBySpeciality);
router.post('/add-speciality', add);
router.put('/update-speciality/:specialityId', requireSignin, update);
router.delete('/delete-speciality/:specialityId', requireSignin, remove);

module.exports = router;