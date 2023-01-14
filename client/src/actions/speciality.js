import axios from 'axios'

export const allSpecialities = async (token) => await axios.get(`${process.env.REACT_APP_API}/specialities/`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

export const speciality = async (token, specialityId) => 
    await axios.get(`${process.env.REACT_APP_API}/speciality/${specialityId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const restaurantsBySpeciality = async (token, specialityId) => 
    await axios.get(`${process.env.REACT_APP_API}/speciality-restaurants/${specialityId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });