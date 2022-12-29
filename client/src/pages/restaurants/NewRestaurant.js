import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConnectNav from "../../components/menu/ConnectNav";
import RestaurantCreateForm from '../../components/forms/RestaurantCreateForm';
import { allSpecialities } from "../../actions/speciality";
import { createRestaurant } from '../../actions/restaurant';

const NewRestaurant = () => {
    const navigate = useNavigate();
    
    //redux
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    //state
    const [values, setValues] = useState({
        title: '',
        instagram: '',
        halal: false,
        onlyDelivery: false,
        specialities: [],
        street: '',
        zip: '',
        city: '',
        country: '',
        image: '',
    });
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');
    const [specialitiesList, setSpecialitiesList] = useState([]);

    useEffect(() => {
        getAllSpecialities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Specialities
    const getAllSpecialities = async () => {
        const res = await allSpecialities(token);
        setSpecialitiesList(res.data);
    };

    //destructuring variables from state
    const {title, instagram, halal, onlyDelivery, specialities, street, zip, city, country, image} = values;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let restaurantData = new FormData()
        restaurantData.append('title', title)
        restaurantData.append('instagram', instagram)
        restaurantData.append('halal', halal)
        restaurantData.append('onlyDelivery', onlyDelivery)
        restaurantData.append('specialities', specialities)
        restaurantData.append('street', street)
        restaurantData.append('zip', zip)
        restaurantData.append('city', city)
        restaurantData.append('country', country)
        image && restaurantData.append('image', image)

        try {
            let res = await createRestaurant(token, restaurantData);
            console.log('RESTAURANT CREATE RES', res);
            toast.success('Restaurant créé avec succès');
            setTimeout(() => {
                navigate(`/restaurant/${res.data._id}`);
            }, 1000)
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        }
        
    };

    const handleImageChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({ ...values, image: e.target.files[0] });
    };

    const handleCheckBoxChange = (e) => {
        setValues({...values, [e.target.name]: e.target.checked});
    };

    function handleSelect(e) {
        let result = e.map(item => (item._id))
        setValues({...values, "specialities": result});
    }

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="text-center">
                <h2>Ajouter un restaurant</h2>
            </div>
            
            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-10'>
                        <br />
                        <RestaurantCreateForm 
                            values={values} 
                            setValues={setValues} 
                            specialitiesList={specialitiesList}
                            handleChange={handleChange} 
                            handleImageChange={handleImageChange} 
                            handleCheckBoxChange={handleCheckBoxChange} 
                            handleSelect={handleSelect} 
                            handleSubmit={handleSubmit} 
                        />
                    </div>
                    <div className='col-md-2'>
                        <img src={preview} alt="preview_image" className='img img-fluid m-2' />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewRestaurant;