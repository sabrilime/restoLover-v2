import Speciality from '../models/speciality';

export const specialities = async (req, res) => {
    let all = await Speciality.find({})
        .select('-restaurants')
        .sort({ name: 1 })
        .exec();
    res.json(all);
};

export const restaurantsBySpeciality = async (req, res) => {
    try {
        let speciality = await Speciality.findById(req.params.specialityId)
        .populate({ path: 'restaurants', select: 'title', options: { sort: [{'title': 1 }] } })
        .exec();
        res.send(speciality);
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
};

export const add = async (req, res) => {
    try {
        const {name} = req.body;
        //verification
        if(!name) return res.status(400).send('Speciality name is required')
        let SpecialityExist = await Speciality.findOne({name}).exec();
        if(SpecialityExist) return res.status(400).send('Speciality is already added');

        //Add Speciality
        const speciality = new Speciality(req.body);

        await speciality.save()
        return res.json({ok: true});
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
};

export const update = async (req, res) => {
    try {
        let updated = await Speciality.findByIdAndUpdate(
            req.params.specialityId, 
            req.body, 
            {new: true,}
        ).select('-restaurants');
        res.json(updated);

    } catch (err) {
        console.log(err);
        res.status(400).send('Speciality name update failed. Try again.')
    }
};

export const remove = async (req, res) => {
    let removed = await Speciality.findByIdAndDelete(req.params.specialityId)
    .select('-restaurants')
    .exec();
    res.json(removed);
};