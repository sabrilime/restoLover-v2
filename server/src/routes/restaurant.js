import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { 
    restaurants, 
    create, 
    read, 
    update, 
    remove,
    image,
    searchListings,
    restaurantsByUser,
    restaurantsByCity,
    restaurantsOnlyDelivery,
} from '../controllers/restaurant';

router.get('/restaurants', restaurants);
router.get('/restaurant/:restaurantId', requireSignin, read);
router.post('/restaurant', requireSignin, formidable(), create);
router.put('/update-restaurant/:restaurantId', requireSignin, formidable(), update);
router.delete('/delete-restaurant/:restaurantId', requireSignin, remove);
router.get('/restaurant/image/:restaurantId', image);
router.get('/restaurants-search/:name', requireSignin, searchListings);
router.get('/restaurants-user/:userId', requireSignin, restaurantsByUser);
router.get('/restaurants-city/:city', requireSignin, restaurantsByCity);
router.get('/restaurants/only-delivery', requireSignin, restaurantsOnlyDelivery);

module.exports = router;