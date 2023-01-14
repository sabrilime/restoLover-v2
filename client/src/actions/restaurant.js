import axios from 'axios'

export const updateRestaurant = async (token, data, restaurantId) => 
    await axios.put(
        `${process.env.REACT_APP_API}/update-restaurant/${restaurantId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

export const read = async (token, restaurantId) => await axios.get(`${process.env.REACT_APP_API}/restaurant/${restaurantId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

export const restaurantsByCity = async (token, city) => 
    await axios.get(`${process.env.REACT_APP_API}/restaurants-city/${city}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const restaurantsByUser = async (token, userId) => 
    await axios.get(`${process.env.REACT_APP_API}/restaurants-user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const getOnlyDelivery = async (token) => await axios.get(`${process.env.REACT_APP_API}/restaurants/only-delivery`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

export const createRestaurant = async (token, data) => await axios.post(
    `${process.env.REACT_APP_API}/restaurant`,
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
);

export const searchRestaurants = async (token, name) => 
    await axios.get(`${process.env.REACT_APP_API}/restaurants-search/${name}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });