import Address from "../models/address";

export const countries = async (req, res) => {
    let countries = await Address.aggregate([{
        $group: {
          _id: "$country",
        }
      }]);
      res.json(countries);
};

export const citiesByCountry = async (req, res) => {
    let cities = await Address.aggregate([
        { $match: { country: req.params.country } },
        {
        $group: {
          _id: "$city",
        }
      }]);
      res.json(cities);
};