import mongoose from "mongoose";

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const favouriteSchema = new Schema({
    user: {
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

export default mongoose.model('Favourite', favouriteSchema)