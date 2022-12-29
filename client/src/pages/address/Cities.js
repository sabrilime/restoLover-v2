import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { citiesByCountry } from '../../actions/address';
import ConnectNav from "../../components/menu/ConnectNav";
import SmallCard from '../../cards/SmallCard';

const Cities = () => {
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    const [cities, setCities] = useState([]);

    let { country } = useParams();

    useEffect(() => {
        getCities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCities = async () => {
        const res = await citiesByCountry(token, country);
        setCities(res.data);
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
                            {cities.map(city => (
                                <SmallCard 
                                    key={city._id} 
                                    name={city._id} 
                                    link={`/restaurants/city/${city._id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Cities;