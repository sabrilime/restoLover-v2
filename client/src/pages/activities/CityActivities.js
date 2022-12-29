import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ConnectNav from "../../components/menu/ConnectNav";
import { activitiesByCity } from '../../actions/activity';
import SmallCard from '../../cards/SmallCard';

const CityActivities = (props) => {
    let { city } = useParams();
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getRestaurantsBySpecialities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRestaurantsBySpecialities = async () => {
        const res = await activitiesByCity(token, city);
        setActivities(res.data);
    };

    return (
       <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-0" id="card_counts">
                        <div className="row">
                            {activities.map(activity => (
                                <SmallCard 
                                    key={activity._id} 
                                    name={activity.title} 
                                    link={`/activity/${activity._id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
};

export default CityActivities;