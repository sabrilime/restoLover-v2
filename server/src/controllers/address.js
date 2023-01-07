import Address from "../models/address";
import Restaurant from "../models/restaurant";
import Activity from "../models/activity";

export const restaurantsCountries = async (req, res) => {
    
  /*const countries = await Address.aggregate([{
        $group: {
          _id: "$country",
        }
      },
      { $sort : { _id : 1 } }
  ]);
  
  await Restaurant.populate(countries, {path: "address"});
  res.json(countries);*/


  const countries = await Restaurant.aggregate([
    {
      $lookup: {
        from: "addresses",
        localField: "address",
        foreignField: "_id",
        as: "address"

      }
    },
    {
      $unwind: "$address"
    },
    {
      $group: {
        _id: "$address.country",
      }
    },
    { $sort : { _id : 1 } }
  ]);
  res.json(countries);
};

export const restaurantsCitiesByCountry = async (req, res) => {

  const cities = await Restaurant.aggregate([
    {
      $lookup: {
          from: "addresses",
          let: { activity_address: "$address"},
          pipeline: [
            { $match:
              { $expr:
                  { $and:
                      [
                          { $eq: ["$$activity_address", "$_id" ] },
                          { $eq: ["$country", req.params.country ] },
                      ]
                  }
              }
          }
          ],
          as: "country"
      }
    },
    {
      $unwind: "$country"
    },
    {
      $group: {
        _id: "$country.city",
        zip : { $first: '$country.zip' },
      }
    },
    { $sort : { _id : 1 } }
  ]);
  res.json(cities);
};

export const activitiesCountries = async (req, res) => {
    
  const countries = await Activity.aggregate([
    {
      $lookup: {
        from: "addresses",
        localField: "address",
        foreignField: "_id",
        as: "address"

      }
    },
    {
      $unwind: "$address"
    },
    {
      $group: {
        _id: "$address.country",
      }
    },
    { $sort : { _id : 1 } }
  ]);
  res.json(countries);
};

export const activitiesCitiesByCountry = async (req, res) => {
    /*const cities = await Address.aggregate([
        { $match: { country: req.params.country } },
        {
        $group: {
          _id: "$city",
        }
      },
      { $sort : { _id : 1 } }
    ]);

    await Activity.populate(cities, {path: "address"});
    res.json(cities);*/


    const cities = await Activity.aggregate([
      {
        $lookup: {
            from: "addresses",
            let: { activity_address: "$address"},
            pipeline: [
              { $match:
                { $expr:
                    { $and:
                        [
                            { $eq: ["$$activity_address", "$_id" ] },
                            { $eq: ["$country", req.params.country ] },
                        ]
                    }
                }
            }
            ],
            as: "country"
        }
      },
      {
        $unwind: "$country"
      },
      {
        $group: {
          _id: "$country.city",
          zip : { $first: '$country.zip' },
        }
      },
      { $sort : { _id : 1 } }
    ]);
    res.json(cities);
};