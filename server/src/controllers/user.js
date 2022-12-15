import User from '../models/user';

export const update = async (req, res) => {
    try {
        //Get password
        if(req.body.password == null) { 
            User.find({'_id' : req.params.userId}, function (err, user) {
                if (err) return handleError(err);
                req.body.password = user.password;
            });
        }
        
        let updated = await User.findByIdAndUpdate(
            req.params.userId, 
            req.body, 
            {new: true,}
        ).select();
        res.json(updated);

    } catch (err) {
        console.log(err);
        res.status(400).send('User update failed. Try again.')
    }
};