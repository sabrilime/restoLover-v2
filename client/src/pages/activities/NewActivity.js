import { useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createActivity } from '../../actions/activity';
import ConnectNav from "../../components/menu/ConnectNav";
import ActivityCreateForm from '../../components/forms/ActivityCreateForm';

const NewActivity = () => {
    const navigate = useNavigate();
    
    //redux
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    //state
    const [values, setValues] = useState({
        title: '',
        type: '',
        street: '',
        zip: '',
        city: '',
        country: '',
        image: '',
    });
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW');

    //destructuring variables from state
    const {title, type, street, zip, city, country, image} = values;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let activityData = new FormData()
        activityData.append('title', title)
        activityData.append('type', type)
        activityData.append('street', street)
        activityData.append('zip', zip)
        activityData.append('city', city)
        activityData.append('country', country)
        image && activityData.append('image', image)

        try {
            let res = await createActivity(token, activityData);
            console.log('ACTIVITY CREATE RES', res);
            toast.success('Activité créé avec succès');
            setTimeout(() => {
                navigate(`/activity/${res.data._id}`);
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

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="text-center">
                <h2>Ajouter une activité</h2>
            </div>
            
            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-10'>
                        <br />
                        <ActivityCreateForm 
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

export default NewActivity;