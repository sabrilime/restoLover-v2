import Activity from "../models/activity";
import Address from "../models/address";
import fs from 'fs';

export const activities = async (req, res) => {
    let all = await Activity.find({})
        .select('-image.data')
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
        let address = new Address(fields);
        //handle image
        if(files.image) {
            activity.image.data = fs.readFileSync(files.image.path);
            activity.image.contentType = files.image.type;
        }

        //Add address
        let saveAddress = await address.save();
        activity.address = saveAddress._id;

        activity.save((err, result) => {
            if(err) {
                console.log("saving activity error => ", err)
                res.status(400).send('Erreur ajout activité')
            }
            res.json(result);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message
        })
    }
};

export const update = async (req, res) => {
    try {
        let activityId = req.params.activityId
        let fields = req.fields;
        let files = req.files;
        let data = {...fields}
        if(files.image) {
            let image = {}
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;
            data.image = image;
        }

        //update address
        let addressId = await Activity.findById(activityId).select('address').exec();
        await Address.findByIdAndUpdate(
            addressId.address.toString(), 
            data, 
            {new: true,}
        );

        let updated = await Activity.findByIdAndUpdate(
            activityId, 
            data, 
            {new: true,}
        ).select('-image.data');
        res.json(updated);

    } catch (err) {
        console.log(err);
        res.status(400).send('Activity update failed. Try again.')
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

export const activitiesByCity = async (req, res) => {
    let addresses = await Activity.find().populate('address', '_id street zip city country')
    .sort({ title: 1 })
    .exec();
    const result = addresses.filter(address => address.address && address.address.city == req.params.city );
    res.json(result);
};

export const activitiesByUser = async (req, res) => {
    const all = await Activity.find({postedBy: req.params.userId})
        .select('title')
        .sort({ title: 1 })
        .exec();
    res.json(all);
};

export const searchListings = async (req, res) => {
    const all = await Activity.find({title: { $regex: '.*' + req.params.name + '.*', $options: 'i' } })
        .select('title')
        .sort({ title: 1 })
        .exec();
    res.json(all);
};