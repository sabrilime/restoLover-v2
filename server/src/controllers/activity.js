import Activity from "../models/restaurant";
import Address from "../models/address";
import fs from 'fs';

export const activities = async (req, res) => {
    let all = await Activity.find({})
        .select()
        .exec();
    res.json(all);
};

export const read = async (req, res) => {
    let activity = await Activity.findById(req.params.activityId)
    .populate('postedBy', '_id firstName lastName')
    .populate('address', '_id street zip city country')
    .select('-image.data')
    .exec();
    res.json(activity);
};

export const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;
        let activity = new Activity(fields);
        activity.postedBy = req.auth._id;
        //handle image
        if(files.image) {
            activity.image.data = fs.readFileSync(files.image.path);
            activity.image.contentType = files.image.type;
        }

        let address = new Address(fields);
        //Add Address
        let saveAddress = await address.save();
        activity.address = saveAddress._id;

        activity.save((err, result) => {
            if(err) {
                console.log("saving activity error => ", err)
                res.status(400).send('Error saving')
            }
            res.json(result);
        })
    } catch (err) {
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
    let removed = await Activity.findByIdAndDelete(req.params.activityId)
    .select('-image.data')
    .exec();
    res.json(removed);
};

export const image = async (req, res) => {
    let activity = await Activity.findById(req.params.activityId).exec();
    if(activity && activity.image && activity.image.data !== null) {
        res.set('Content-Type', activity.image.contentType);
        return res.send(activity.image.data);
    }
};