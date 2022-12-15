import mongoose from "mongoose";

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const specialitySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    restaurants: [{
        type: ObjectId,
        ref: "Restaurant",
    }],
}, { timestamps: true }
);

export default mongoose.model('Speciality', specialitySchema)