import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import ConnectNav from "../../components/menu/ConnectNav";
import HomeNav from '../../components/menu/HomeNav';
import SmallCard from '../../components/cards/SmallCard';
import { allSpecialities } from "../../actions/speciality";

const Home = () => {
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    const [specialities, setSpecialities] = useState([]);

    useEffect(() => {
        getAllSpecialities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllSpecialities = async () => {
        const res = await allSpecialities(token);
        setSpecialities(res.data);
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
                            {specialities.map(speciality => (
                                <SmallCard 
                                    key={speciality._id} 
                                    name={speciality.name} 
                                    link={`/speciality/${speciality._id}`}
                                />
                            ))}
                            <SmallCard 
                                key="only_delivery"
                                name="Uniquement livraison" 
                                link={`/speciality-delivery`}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
};

export default Home;