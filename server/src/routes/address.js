import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { 
    restaurantsCountries, 
    restaurantsCitiesByCountry, 
    activitiesCountries, 
    activitiesCitiesByCountry 
} from '../controllers/address';

router.get('/address-restaurants/countries', requireSignin, restaurantsCountries);
router.get('/address-restaurants/cities/:country', requireSignin, restaurantsCitiesByCountry);
router.get('/address-activities/countries', requireSignin, activitiesCountries);
router.get('/address-activities/cities/:country', requireSignin, activitiesCitiesByCountry);


module.exports = router;