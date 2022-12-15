import Restaurant from "../models/restaurant";
import Address from "../models/address";
import Speciality from "../models/speciality";
import fs from 'fs';

export const restaurants = async (req, res) => {
    let all = await Restaurant.find({})
        .select()
        .exec();
    res.json(all);
};

export const read = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.restaurantId)
    .populate('postedBy', '_id firstName lastName')
    .populate('address', '_id street zip city country')
    .populate('specialities', '_id name')
    .select('-image.data')
    .exec();
    res.json(restaurant);
};

export const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;
        req.fields.specialities = ["639629beddcb55577c71ad47", "639775eebbde0a08b4d89ee9"];
        let restaurant = new Restaurant(fields);
        restaurant.postedBy = "6394acb98f6b95b6757f88a8";
        let address = new Address(fields);
        //console.log("RESTAURANT ===> ", restaurant);
        //console.log("ADDRESS ===> ", address);
        
        //restaurant.postedBy = req.auth._id;
        //handle image
        if(files.image) {
            restaurant.image.data = fs.readFileSync(files.image.path);
            restaurant.image.contentType = files.image.type;
        }

        //Add Address
        let saveAddress = await address.save();
        restaurant.address = saveAddress._id;
        
        await Speciality.updateMany({ '_id': req.fields.specialities }, { $push: { restaurants: restaurant._id } });
        restaurant.save((err, result) => {
            if(err) {
                console.log("saving restaurant error => ", err)
                res.status(400).send('Erreur ajout restaurant')
            }
            res.json(result);
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
};

export const update = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        /*let data = {...fields}
        if(files.image) {
            let image = {}
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;

            data.image = image;
        }
        let updated = await Hotel.findByIdAndUpdate(
            req.params.hotelId, 
            data, 
            {new: true,}
        ).select('-image.data');
        res.json(updated);*/

    } catch (err) {
        console.log(err);
        res.status(400).send('Hotel update failed. Try again.')
    }
};

export const remove = async (req, res) => {
    let removed = await Restaurant.findByIdAndDelete(req.params.restaurantId)
    .select('-image.data')
    .exec();
    res.json(removed);
};

export const image = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.restaurantId).exec();
    if(restaurant && restaurant.image && restaurant.image.data !== null) {
        res.set('Content-Type', restaurant.image.contentType);
        return res.send(restaurant.image.data);
    }
};

export const searchListings = async (req, res) => {
    //
};

export const restaurantsByUser = async (req, res) => {
    const all = await Restaurant.find({postedBy: req.params.userId})
        .select('title')
        .exec();
    res.json(all);
};

export const restaurantsByCity = async (req, res) => {
    let addresses = await Restaurant.find().populate('address', '_id street zip city country')
    .exec();
    const result = addresses.filter(address => address.address && address.address.city == req.params.city );
    res.json(result);
};