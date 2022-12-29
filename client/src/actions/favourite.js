import axios from 'axios'

export const FavouriteRestaurantsByUser = async (token, userId) => 
    await axios.get(`${process.env.REACT_APP_API}/favourite-restaurants/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const isRestaurantFavourite = async (token, restaurantId) => 
    await axios.get(`${process.env.REACT_APP_API}/favourite-restaurant/${restaurantId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const addRestaurantFavourite = async (token, data) => await axios.post(
    `${process.env.REACT_APP_API}/favourite-restaurant`,
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
);

export const removeRestaurantFavourite = async (token, data) => 
    await axios.post(`${process.env.REACT_APP_API}/favourite-restaurant-delete`,
        data, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    

export const FavouriteActivitiesByUser = async (token, userId) => 
    await axios.get(`${process.env.REACT_APP_API}/favourite-activities/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const isActivityFavourite = async (token, activityId) => 
    await axios.get(`${process.env.REACT_APP_API}/favourite-activity/${activityId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const addActivityFavourite = async (token, data) => await axios.post(
    `${process.env.REACT_APP_API}/favourite-activity`,
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
);

export const removeActivityFavourite = async (token, data) => 
    await axios.post(`${process.env.REACT_APP_API}/favourite-activity-delete`,
        data, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );