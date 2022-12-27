import mongoose from "mongoose";

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        required: 'Content is required',
        maxlength: 10000,
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    restaurant: {
        type: ObjectId,
        ref: "Restaurant",
    },
    activity: {
        type: ObjectId,
        ref: "Activity",
    },
}, { timestamps: true }
);

export default mongoose.model('Comment', commentSchema)