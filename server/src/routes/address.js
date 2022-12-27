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

router.get('/address-restaurants/countries', restaurantsCountries);
router.get('/address-restaurants/cities/:country', restaurantsCitiesByCountry);
router.get('/address-activities/countries', activitiesCountries);
router.get('/address-activities/cities/:country', activitiesCitiesByCountry);


module.exports = router;