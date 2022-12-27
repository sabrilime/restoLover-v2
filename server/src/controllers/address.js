import Address from "../models/address";
import Restaurant from "../models/restaurant";
import Activity from "../models/activity";

export const restaurantsCountries = async (req, res) => {
    
  const countries = await Address.aggregate([{
        $group: {
          _id: "$country",
        }
      },
      { $sort : { _id : 1 } }
  ]);
  
  await Restaurant.populate(countries, {path: "address"});
  res.json(countries);
};

export const restaurantsCitiesByCountry = async (req, res) => {
    const cities = await Address.aggregate([
        { $match: { country: req.params.country } },
        {
        $group: {
          _id: "$city",
        }
      },
      { $sort : { _id : 1 } }
    ]);

    await Restaurant.populate(cities, {path: "address"});
    res.json(cities);
};

export const activitiesCountries = async (req, res) => {
    
  const countries = await Address.aggregate([{
        $group: {
          _id: "$country",
        }
      },
      { $sort : { _id : 1 } }
  ]);
  
  await Activity.populate(countries, {path: "address"});
  res.json(countries);
};

export const activitiesCitiesByCountry = async (req, res) => {
    const cities = await Address.aggregate([
        { $match: { country: req.params.country } },
        {
        $group: {
          _id: "$city",
        }
      },
      { $sort : { _id : 1 } }
    ]);

    await Activity.populate(cities, {path: "address"});
    res.json(cities);
};