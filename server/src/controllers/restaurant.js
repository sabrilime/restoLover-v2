import mongoose from "mongoose";
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
        req.fields.specialities = req.fields.specialities.split(",");

        let restaurant = new Restaurant(fields);
        restaurant.postedBy = req.auth._id;
        let address = new Address(fields);
        //handle image
        if(files.image) {
            restaurant.image.data = fs.readFileSync(files.image.path);
            restaurant.image.contentType = files.image.type;
        }

        //Add address
        let saveAddress = await address.save();
        restaurant.address = saveAddress._id;

        await Speciality.updateMany({ '_id': { $in: req.fields.specialities } }, { $push: { restaurants: restaurant._id } });

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
        let restaurantId = req.params.restaurantId
        let fields = req.fields;
        let files = req.files;
        req.fields.specialities = req.fields.specialities.split(",");
        let data = {...fields}
        if(files.image) {
            let image = {}
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;
            data.image = image;
        }

        //update address
        let addressId = await Restaurant.findById(restaurantId).select('address').exec();
        await Address.findByIdAndUpdate(
            addressId.address.toString(), 
            data, 
            {new: true,}
        );
        
        await Speciality.updateMany({ '_id': { $in: req.fields.specialities } }, { $addToSet: { restaurants: restaurantId } });
        
        let updated = await Restaurant.findByIdAndUpdate(
            restaurantId, 
            data, 
            {new: true,}
        ).select('-image.data');
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(400).send('Restaurant update failed. Try again.')
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
    const all = await Restaurant.find({title: { $regex: '.*' + req.params.name + '.*', $options: 'i' } })
        .select('title')
        .sort({ title: 1 })
        .exec();
    res.json(all);
};

export const restaurantsByUser = async (req, res) => {
    const all = await Restaurant.find({postedBy: req.params.userId})
        .select('title')
        .sort({ title: 1 })
        .exec();
    res.json(all);
};

export const restaurantsByCity = async (req, res) => {
    let addresses = await Restaurant.find().populate('address', '_id street zip city country')
    .sort({ title: 1 })
    .exec();
    const result = addresses.filter(address => address.address && address.address.city == req.params.city );
    res.json(result);
};

export const restaurantsOnlyDelivery = async (req, res) => {
    let restaurants = await Restaurant.find({onlyDelivery: true})
        .populate('address', '_id street zip city country')
        .select('-image.data')
        .exec();
    res.json(restaurants);
};