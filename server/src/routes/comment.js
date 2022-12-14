import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { 
    read, 
    update, 
    remove,
    createCommentRestaurant,
    createCommentActivity,
    commentsByRestaurant,
    commentsByActivity,
} from '../controllers/comment';

router.get('/comment/:commentId', read);
router.put('/comment/:commentId', requireSignin, update);
router.delete('/comment/:commentId', requireSignin, remove);
router.post('/comment/restaurant/:restaurantId', requireSignin, createCommentRestaurant);
router.post('/comment/activity/:activityId', requireSignin, createCommentActivity);
router.get('/comments/restaurant/:restaurantId', requireSignin, commentsByRestaurant);
router.get('/comments/activity/:activityId', requireSignin, commentsByActivity);


module.exports = router;