import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { 
    activities, 
    create, 
    read, 
    update, 
    remove,
    image,
    activitiesByCity, 
    activitiesByUser, 
} from '../controllers/activity';

router.get('/activities', requireSignin, activities);
router.get('/activity/:activityId', requireSignin, read);
router.post('/activity', requireSignin, formidable(), create);
router.put('/update-activity/:activityId', requireSignin, formidable(), update);
router.delete('/delete-activity/:activityId', requireSignin, remove);
router.get('/activity/image/:activityId', image);
router.get('/activities-city/:city', requireSignin, activitiesByCity);
router.get('/activities-user/:userId', requireSignin, activitiesByUser);


module.exports = router;