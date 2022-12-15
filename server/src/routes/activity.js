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
} from '../controllers/activity';

router.get('/activities', activities);
router.get('/activity/:activityId', read);
router.post('/activity', formidable(), create);
router.put('/update-activity/:activityId', requireSignin, formidable(), update);
router.delete('/delete-activity/:activityId', requireSignin, remove);
router.get('/activity/image/:activityId', image);


module.exports = router;