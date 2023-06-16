import Autocomplete from "react-google-autocomplete";

const ActivityCreateForm = ({
    values, setValues, handleChange, handleImageChange, handleCity, handleSubmit
}) => {
    const {title, type, street, zip} = values
    
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group mb-3'>
                <label className='btn btn-outline-secondary btn-block m-2 text-left'>
                    Image
                    <input 
                        type='file' 
                        name='image' 
                        onChange={handleImageChange} 
                        accept='image/*' 
                        hidden 
                    />
                </label>
            </div>
            <div className='form-group mb-3'>
                <input 
                    type='text' 
                    name='title' 
                    onChange={handleChange} 
                    placeholder="Nom de l'activité" 
                    className='form-control'
                    value={title}
                    required="required"
                />
            </div>
            <div className='form-group mb-3'>
                <input 
                    type='text' 
                    name='type' 
                    onChange={handleChange} 
                    placeholder='Type' 
                    className='form-control'
                    value={type}
                />
            </div>
            <div className='form-group mb-3'>
                <input 
                    type='text' 
                    name='street' 
                    onChange={handleChange} 
                    placeholder='Adresse' 
                    className='form-control'
                    value={street}
                />
            </div>
            <div className='form-group mb-3'>
                <input 
                    type='number' 
                    name='zip' 
                    onChange={handleChange} 
                    placeholder='Code postal' 
                    className='form-control'
                    value={zip}
                />
            </div>
            <div className='form-group mb-3'>
                <Autocomplete
                    className='form-control'
                    placeholder='Ville' 
                    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={(place) => handleCity(place)}
                />
            </div>

            <button className='btn btn-outline-primary m-2'>Ajouter</button>
        </form>
    )
}

export default ActivityCreateForm;