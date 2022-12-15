import mongoose from "mongoose";

const {Schema} = mongoose

const addressSchema = new Schema({
    street: {
        type: String,
        required: 'Street is required',
        maxlength: 10000,
    },
    zip: {
        type: String,
        required: 'zip is required',
    },
    city: {
        type: String,
        required: 'city is required',
    },
    country: {
        type: String,
        required: 'country is required',
    },
}, { timestamps: true }
);

export default mongoose.model('Address', addressSchema)