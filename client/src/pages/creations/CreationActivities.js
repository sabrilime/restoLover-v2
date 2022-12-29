import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ConnectNav from "../../components/menu/ConnectNav";
import CreationsNav from "../../components/menu/CreationsNav";
import { activitiesByUser } from "../../actions/activity";
import SmallCard from '../../cards/SmallCard';

const CreationActivities = () => {
    const {auth} = useSelector((state) => ({ ...state }));
    const {user, token } = auth;

    const [creations, setCreations] = useState([]);

    useEffect(() => {
        getRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRestaurants = async () => {
        const res = await activitiesByUser(token, user._id);
        setCreations(res.data);
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <CreationsNav /> 
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-0" id="card_counts">
                        <div className="row">
                            {creations.map(creation => (
                                creation && 
                                    <SmallCard 
                                        key={creation._id} 
                                        name={creation.title} 
                                        link={`/activity/${creation._id}`}
                                    />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreationActivities;