import mongoose from 'mongoose';

const connect = () => {
    mongoose.connect(process.env.DATABASE, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
 })
 .then(() => console.log("DB connected"))
 .catch((err) => console.log("DB Error => ", err));
}

module.exports=connect