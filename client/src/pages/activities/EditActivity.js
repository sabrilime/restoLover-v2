import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConnectNav from "../../components/menu/ConnectNav";
import { read, updateActivity } from '../../actions/activity';
import EditActivityForm from '../../components/forms/EditActivityForm';

const EditActivity = (props) => {
    const navigate = useNavigate();

    //redux
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    let { activityId } = useParams();

    //state
    const [values, setValues] = useState({
        title: '',
        type: '',
        street: '',
        zip: '',
        city: '',
        country: '',
    });
    const [images, setImages] = useState("");
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');


    //destructuring variables from state
    const {title, type, street, zip, city, country} = values;

    useEffect(() => {
        getActivity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getActivity = async () => {
        const res = await read(token, activityId);
        
        res.data.street = res.data.address.street;
        res.data.zip = res.data.address.zip;
        res.data.city = res.data.address.city;
        res.data.country = res.data.address.country;
        delete res.data.address;
        setValues({ ...values, ...res.data });
        setPreview(`${process.env.REACT_APP_API}/activity/image/${activityId}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let activityData = new FormData();
        activityData.append('title', title)
        activityData.append('type', type)
        activityData.append('street', street)
        activityData.append('zip', zip)
        activityData.append('city', city)
        activityData.append('country', country)
        images && activityData.append('image', images)

        try {
            let res = await updateActivity(token, activityData, activityId);
            toast.success(`${res.data.title} a été modifié`);
            setTimeout(() => {
                navigate(`/activity/${res.data._id}`);
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
                        <EditActivityForm 
                            values={values} 
                            setValues={setValues} 
                            handleChange={handleChange} 
                            handleImageChange={handleImageChange} 
                            handleSubmit={handleSubmit} 
                        />
                    </div>
                    <div className='col-md-2'>
                        <img src={preview} alt="preview_image" className='img img-fluid m-2' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditActivity;