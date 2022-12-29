import axios from 'axios'

export const commentsByRestaurant = async (token, restaurantId) => 
    await axios.get(`${process.env.REACT_APP_API}/comments/restaurant/${restaurantId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const commentsByActivity = async (token, activityId) => 
    await axios.get(`${process.env.REACT_APP_API}/comments/activity/${activityId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const addCommentToRestaurant = async (token, restaurantId, data) => await axios.post(
    `${process.env.REACT_APP_API}/comment/restaurant/${restaurantId}`, 
    data, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const addCommentToActivity = async (token, activityId, data) => await axios.post(
    `${process.env.REACT_APP_API}/comment/activity/${activityId}`, 
    data, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });