import Favourite from "../models/favourite";

export const favouriteRestaurantsByUser = async (req, res) => {
    const isFavourite = await Favourite.find({user: req.params.userId, restaurant: {$ne:null}})
    .populate('restaurant', '_id title')
    .exec();
    res.json(isFavourite);
};

export const isRestaurantFavourite = async (req, res) => {
    let isFavourite = await Favourite.findOne({restaurant: req.params.restaurantId}).exec();
    if(isFavourite) return res.json({ok: true});
    res.json({ok: false});
};

export const favouriteActivitiesByUser = async (req, res) => {
    const favouriteRestaurants = await Favourite.find({user: req.params.userId, activity: {$ne:null}})
        .populate('activity', '_id title')
        .exec();
    res.json(favouriteRestaurants);
};

export const isActivityFavourite = async (req, res) => {
    let isFavourite = await Favourite.findOne({activity: req.params.activityId}).exec();
    if(isFavourite) return res.json({ok: true});
    res.json({ok: false});
};

export const createFavouriteRestaurant = async (req, res) => {
    try {
        const {user, restaurant} = req.body;
        //verification
        if(!user) return res.status(400).send('user is required')
        if(!restaurant) return res.status(400).send('restaurant is required')

        //Add Favourite restaurant
        const favourite = new Favourite(req.body);

        await favourite.save()
        return res.json({ok: true});
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
};

export const createFavouriteActivity = async (req, res) => {
    try {
        const {user, activity} = req.body;
        //verification
        if(!user) return res.status(400).send('user is required')
        if(!activity) return res.status(400).send('activity is required')

        //Add Favourite activity
        const favourite = new Favourite(req.body);

        await favourite.save()
        return res.json({ok: true});
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
};

export const removeFavouriteRestaurant = async (req, res) => {
    console.log("DATA ==> ", req.body)
    let removed = await Favourite.findOneAndDelete({user: req.body.user, restaurant: req.body.restaurant})
    .exec();
    res.json(removed);
};

export const removeFavouriteActivity = async (req, res) => {
    let removed = await Favourite.findOneAndDelete({user: req.body.user, activity: req.body.activity})
    .exec();
    res.json(removed);
};