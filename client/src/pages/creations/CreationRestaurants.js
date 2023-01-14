import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from "@ant-design/icons";
import ConnectNav from "../../components/menu/ConnectNav";
import CreationsNav from "../../components/menu/CreationsNav";
import SmallCard from '../../components/cards/SmallCard';
import { restaurantsByUser } from "../../actions/restaurant";

const CreationRestaurants = () => {
    const {auth} = useSelector((state) => ({ ...state }));
    const {user, token } = auth;

    const navigate = useNavigate();

    const [creations, setCreations] = useState([]);

    useEffect(() => {
        getRestaurants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRestaurants = async () => {
        const res = await restaurantsByUser(token, user._id);
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
                            <div className="SpecialityCard col-sm-3" onClick ={() => navigate('/restaurants/new')}>
                                <div className="card card-inverse card-info h-100 card text-white bg-info mb-3 text-center pt-2">
                                    <div className="card-block card-title">
                                        <h1 className="mb-2"><PlusOutlined className='h5 pt-2'/></h1>
                                        <h4 className="text-light">Ajouter un restaurant</h4>
                                    </div>
                                </div>
                                <br />
                            </div>
                            {creations.map(creation => (
                                creation && 
                                    <SmallCard 
                                        key={creation._id} 
                                        name={creation.title} 
                                        link={`/restaurant/${creation._id}`}
                                    />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreationRestaurants;