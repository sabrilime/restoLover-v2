import axios from 'axios'

export const activities = async (token) => 
    await axios.get(`${process.env.REACT_APP_API}/activities`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    
export const read = async (token, activityId) => 
    await axios.get(`${process.env.REACT_APP_API}/activity/${activityId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const createActivity = async (token, data) => await axios.post(
    `${process.env.REACT_APP_API}/activity`,
    data,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
);

export const updateActivity = async (token, data, activityId) => 
    await axios.put(
        `${process.env.REACT_APP_API}/update-activity/${activityId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

export const activitiesByCity = async (token, city) => 
    await axios.get(`${process.env.REACT_APP_API}/activities-city/${city}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    
export const activitiesByUser = async (token, userId) => 
    await axios.get(`${process.env.REACT_APP_API}/activities-user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const searchActivities = async (token, name) => 
    await axios.get(`${process.env.REACT_APP_API}/activities-search/${name}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });