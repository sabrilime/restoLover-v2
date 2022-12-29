import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { 
    favouriteRestaurantsByUser, 
    isRestaurantFavourite, 
    createFavouriteRestaurant, 
    removeFavouriteRestaurant, 
    favouriteActivitiesByUser, 
    isActivityFavourite, 
    createFavouriteActivity,
    removeFavouriteActivity,
} from '../controllers/favourite';

router.get('/favourite-restaurants/:userId', favouriteRestaurantsByUser);
router.get('/favourite-restaurant/:restaurantId', requireSignin, isRestaurantFavourite);
router.post('/favourite-restaurant', requireSignin, createFavouriteRestaurant);
router.post('/favourite-restaurant-delete', requireSignin, removeFavouriteRestaurant);

router.get('/favourite-activities/:userId', requireSignin, favouriteActivitiesByUser);
router.get('/favourite-activity/:activityId', requireSignin, isActivityFavourite);
router.post('/favourite-activity', requireSignin, createFavouriteActivity);
router.post('/favourite-activity-delete', requireSignin, removeFavouriteActivity);


module.exports = router;