import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        //validation
        if(!firstName) return res.status(400).send('first name is required')
        if(!lastName) return res.status(400).send('last name is required')
        if(!email) return res.status(400).send('email is required')
        if(!password || password.length<6 || password.length>64) 
            return res
                .status(400)
                .send('Password is required and should be min 6 characters long and max 64 characters long')
        let userExist = await User.findOne({email}).exec();
        if(userExist) return res.status(400).send('Email is taken');

        //Register
        const user = new User(req.body);

        await user.save()
        return res.json({ok: true});
    } catch (err) {
        return res.status(400).send('Error. Try again');
    }
};

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        // check if user with that email exist
        let user = await User.findOne({email}).exec();
        if(!user) return res.status(400).send('USER not found');
        // compare password
        user.comparePassword(password, (err, match) => {
            if(!match || err) return res.status(400).send('wrong password');
            //GENERATE TOKEN
            let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '7d'
            });
            res.json({ token, user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                status: user.isAdmin,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            } });
        });
    } catch (err) {
        res.status(400).send('Signin failed');
    }
}