import axios from 'axios'

export const allCountries = async (token) => 
    await axios.get(`${process.env.REACT_APP_API}/address-restaurants/countries`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const citiesByCountry = async (token, country) => 
    await axios.get(`${process.env.REACT_APP_API}/address-restaurants/cities/${country}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const allActivitiesCountries = async (token) => 
    await axios.get(`${process.env.REACT_APP_API}/address-activities/countries`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const activitiesCitiesByCountry = async (token, country) => 
    await axios.get(`${process.env.REACT_APP_API}/address-activities/cities/${country}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });