import Comment from "../models/comment";
import Restaurant from "../models/restaurant";
import Activity from "../models/activity";

export const read = async (req, res) => {
    //
};

export const update = async (req, res) => {
    //
};

export const remove = async (req, res) => {
    //
};

export const createCommentRestaurant = async (req, res) => {
    try {
        const { content } = req.body;
        //verification
        if(!content) return res.status(400).send('Comment content is required')
        let restaurant = await Restaurant.findById(req.params.restaurantId).exec();
        if(!restaurant) return res.status(400).send('Restaurant ID is not correct');

        //Add Restaurant comment
        const comment = new Comment(req.body);
        comment.restaurant = req.params.restaurantId;

        await comment.save()
        return res.json({ok: true});
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
};

export const createCommentActivity = async (req, res) => {
    try {
        const { content } = req.body;
        //verification
        if(!content) return res.status(400).send('Comment content is required')
        let activity = await Activity.findById(req.params.activityId).exec();
        if(!activity) return res.status(400).send('Activity ID is not correct');

        //Add Restaurant comment
        const comment = new Comment(req.body);
        comment.activity = req.params.activityId;

        await comment.save()
        return res.json({ok: true});
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
};

export const commentsByRestaurant = async (req, res) => {
    const all = await Comment.find({restaurant: req.params.restaurantId})
        .sort({ createdAt: -1 })
        .populate('postedBy', '_id firstName lastName')
        .populate('restaurant', '_id title')
        .exec();
    res.json(all);
};

export const commentsByActivity = async (req, res) => {
    const all = await Comment.find({activity: req.params.activityId})
        .sort({ createdAt: -1 })
        .populate('postedBy', '_id firstName lastName')
        .populate('activity', '_id title')
        .exec();
    res.json(all);
};