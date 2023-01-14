import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ConnectNav from "../../components/menu/ConnectNav";
import SmallCard from '../../components/cards/SmallCard';
import RestaurantBreadcrumbs from '../../components/menu/RestaurantBreadcrumbs';
import { restaurantsBySpeciality, speciality } from '../../actions/speciality';

const SpecialityRestaurants = (props) => {
    let { specialityId } = useParams();
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    const [restaurants, setRestaurants] = useState([]);
    const [specialityName, setSpecialityName] = useState('');
    

    useEffect(() => {
        getRestaurantsBySpecialities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getSpeciality();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRestaurantsBySpecialities = async () => {
        const res = await restaurantsBySpeciality(token, specialityId);
        setRestaurants(res.data.restaurants);
    };

    const getSpeciality = async () => {
        const res = await speciality(token, specialityId);
        setSpecialityName(res.data.name);
    };

    return (
       <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <RestaurantBreadcrumbs name={specialityName} />
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-0" id="card_counts">
                        <div className="row">
                            {restaurants.map(restaurant => (
                                <SmallCard 
                                    key={restaurant._id} 
                                    name={restaurant.title} 
                                    link={`/restaurant/${restaurant._id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
};

export default SpecialityRestaurants;