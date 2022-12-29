import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ConnectNav from "../../components/menu/ConnectNav";
import FavouriteNav from "../../components/menu/FavouriteNav";
import { FavouriteActivitiesByUser } from "../../actions/favourite";
import SmallCard from '../../cards/SmallCard';

const FavouriteActivities = () => {
    const {auth} = useSelector((state) => ({ ...state }));
    const {user, token } = auth;

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        getActivities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getActivities = async () => {
        const res = await FavouriteActivitiesByUser(token, user._id);
        setFavourites(res.data);
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <FavouriteNav /> 
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-0" id="card_counts">
                        <div className="row">
                            {favourites.map(favourite => (
                                favourite.activity && 
                                    <SmallCard 
                                        key={favourite._id} 
                                        name={favourite.activity.title} 
                                        link={`/activity/${favourite.activity._id}`}
                                    />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default FavouriteActivities;