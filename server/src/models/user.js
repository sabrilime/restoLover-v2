import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const {Schema} = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'last name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    isAdmin: {
        type: Boolean,
    },
},{
    timestamps: true
});

// hash password only if user is changing the password or registering for the first time
userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function(err, hash) {
            if(err) {
                console.log('BCRYP HASH ERROR ', err);
                return next(err);
            }
            user.password = hash;
            return next();
        })
    }
    else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function(err, match) {
        if(err) {
            console.log('COMPARE PASSWORD ERROR', err);
            return next(err, false); 
        }
        console.log("MATCH PASSWORD", match)
        return next(null, match);
    })
}

export default mongoose.model('User', userSchema)