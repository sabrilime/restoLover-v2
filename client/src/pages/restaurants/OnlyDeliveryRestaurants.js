import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import ConnectNav from "../../components/menu/ConnectNav";
import SmallCard from '../../components/cards/SmallCard';
import RestaurantBreadcrumbs from '../../components/menu/RestaurantBreadcrumbs';
import { getOnlyDelivery } from "../../actions/restaurant";

const OnlyDeliveryRestaurants = (props) => {
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        getRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRestaurants = async () => {
        const res = await getOnlyDelivery(token);
        setRestaurants(res.data);
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <RestaurantBreadcrumbs name="Uniquement livraison" />
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
}

export default OnlyDeliveryRestaurants;