import { useSelector } from 'react-redux';
import { useState } from "react";
import { Select } from 'antd';
import ConnectNav from '../../components/menu/ConnectNav';
import SmallCard from '../../components/cards/SmallCard';
import { searchRestaurants } from '../../actions/restaurant';
import { searchActivities } from '../../actions/activity';

const { Option } = Select;

const Search = () => {
    const {
        auth: {token}
    } = useSelector((state) => ({ ...state }));

    //state
    const [name, setName] = useState('');
    const [creation, setCreation] = useState('restaurant');
    const [results, setResults] = useState('');

    const searchRestaurantFct = async() => {
        let res = await searchRestaurants(token, name);
        (res.data && setResults(res.data));
    }

    const searchActivityFct = async() => {
        let res = await searchActivities(token, name);
        (res.data && setResults(res.data));
    }

    const handleChange = (e) => {
        setName(e.target.value);
        name.length > 2 ? 
        (
            creation === "restaurant" ?
            searchRestaurantFct() :
            searchActivityFct()
        
        ) 
        : setResults('')
    }

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>
            <br />
            <div className='d-flex pb-4'>
                <Select 
                    onChange={(value) => setCreation(value)} 
                    className="w-100" 
                    size='large'
                    value={creation}
                >
                    <Option key="restaurant">Restaurant</Option>
                    <Option key="activité">Activité</Option>
                </Select>
                <div className='w-100'>
                    <input 
                        type='text' 
                        placeholder='Nom' 
                        value={name}
                        onChange={handleChange}
                        style={{ height: "50px", width: "100%" }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-0" id="card_counts">
                        <div className="row">
                            {results && results.map(result => (
                                <SmallCard 
                                    key={result._id} 
                                    name={result.title} 
                                    link={`/${creation}/${result._id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;