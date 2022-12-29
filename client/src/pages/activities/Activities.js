import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import ConnectNav from '../../components/menu/ConnectNav';
import { activities } from "../../actions/activity";
import ActivityNav from '../../components/menu/ActivityNav';
import SmallCard from '../../cards/SmallCard';

const Activities = () => {
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    const [allActivities, setAllActivities] = useState([]);

    useEffect(() => {
        getAllActivities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllActivities = async () => {
        const res = await activities(token);
        setAllActivities(res.data);
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <ActivityNav /> 
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-0" id="card_counts">
                        <div className="row">
                            {allActivities.map(activity => (
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

export default Activities;