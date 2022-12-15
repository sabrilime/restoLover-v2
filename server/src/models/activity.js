import mongoose from "mongoose";

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const activitySchema = new Schema({
    title: {
        type: String,
        required: 'Title is required',
    },
    type: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    address: {
        type: ObjectId,
        ref: "Address",
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

export default mongoose.model('Activity', activitySchema);