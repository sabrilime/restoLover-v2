import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConnectNav from "../../components/menu/ConnectNav";
import { read, updateRestaurant } from '../../actions/restaurant';
import { allSpecialities } from "../../actions/speciality";
import EditForm from '../../components/forms/EditForm';

const EditRestaurant = (props) => {
    const navigate = useNavigate();

    //redux
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    let { restaurantId } = useParams();

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
    });
    const [images, setImages] = useState("");
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');
    const [specialitiesList, setSpecialitiesList] = useState([]);

    //destructuring variables from state
    const {title, instagram, halal, onlyDelivery, specialities, street, zip, city, country} = values;

    useEffect(() => {
        getRestaurant();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllSpecialities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Specialities
    const getAllSpecialities = async () => {
        const res = await allSpecialities(token);
        setSpecialitiesList(res.data);
    };

    const getRestaurant = async () => {
        const res = await read(token, restaurantId);
        res.data.street = res.data.address.street;
        res.data.zip = res.data.address.zip;
        res.data.city = res.data.address.city;
        res.data.country = res.data.address.country;
        delete res.data.address;
        setValues({ ...values, ...res.data });
        setPreview(`${process.env.REACT_APP_API}/restaurant/image/${restaurantId}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = specialities.map(item => (item._id))
        
        let restaurantData = new FormData();
        restaurantData.append('title', title)
        restaurantData.append('instagram', instagram)
        restaurantData.append('halal', halal)
        restaurantData.append('onlyDelivery', onlyDelivery)
        restaurantData.append('specialities', result)
        restaurantData.append('street', street)
        restaurantData.append('zip', zip)
        restaurantData.append('city', city)
        restaurantData.append('country', country)
        images && restaurantData.append('image', images)

        try {
            let res = await updateRestaurant(token, restaurantData, restaurantId);
            toast.success(`${res.data.title} a été modifié`);
            setTimeout(() => {
                navigate(`/restaurant/${res.data._id}`);
            }, 1000)
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.err);
        }
    };

    const handleImageChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImages(e.target.files[0]);
    };

    const handleCheckBoxChange = (e) => {
        setValues({...values, [e.target.name]: e.target.checked});
    };

    function handleSelect(e) {
        setValues({...values, "specialities": e});
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
                <h2>{title}</h2>
            </div>

            <div className="container-fluid">
                <div className='row'>
                    <div className='col-md-10'>
                        <br />
                        <EditForm 
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

export default EditRestaurant;