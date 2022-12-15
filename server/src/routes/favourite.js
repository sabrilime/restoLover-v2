import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { 
    favouriteRestaurantsByUser, 
    createFavouriteRestaurant, 
    removeFavouriteRestaurant, 
    favouriteActivitiesByUser, 
    createFavouriteActivity,
    removeFavouriteActivity,
} from '../controllers/favourite';

router.get('/favourite-restaurants/:userId', favouriteRestaurantsByUser);
router.post('/favourite-restaurant', formidable(), createFavouriteRestaurant);
router.delete('/favourite-restaurant', requireSignin, removeFavouriteRestaurant);
router.get('/favourite-activities/:userId', favouriteActivitiesByUser);
router.post('/favourite-activity', formidable(), createFavouriteActivity);
router.delete('/favourite-activity', requireSignin, removeFavouriteActivity);


module.exports = router;