import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignin} from '../middlewares';

//controllers
import { 
    countries, 
    citiesByCountry, 
} from '../controllers/address';

router.get('/address/countries', countries);
router.get('/address/cities/:country', citiesByCountry);


module.exports = router;