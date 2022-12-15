import mongoose from "mongoose";

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const restaurantSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required',
    },
    instagram: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    halal: {
        type: Boolean,
    },
    onlyDelivery: {
        type: Boolean,
    },
    address: {
        type: ObjectId,
        ref: "Address",
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    specialities: [{
        type: ObjectId,
        ref: "Speciality",
    }],
}, {
    timestamps: true
});

export default mongoose.model('Restaurant', restaurantSchema);