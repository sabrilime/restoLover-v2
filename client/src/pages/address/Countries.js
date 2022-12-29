import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import ConnectNav from "../../components/menu/ConnectNav";
import HomeNav from '../../components/menu/HomeNav';
import { allCountries } from "../../actions/address";
import SmallCard from '../../cards/SmallCard';

const Countries = () => {
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getAllCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllCountries = async () => {
        const res = await allCountries(token);
        setCountries(res.data);
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <HomeNav /> 
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-0" id="card_counts">
                        <div className="row">
                            {countries.map(country => (
                                <SmallCard 
                                    key={country._id} 
                                    name={country._id} 
                                    link={`/cities/${country._id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Countries;