import { Multiselect } from "multiselect-react-dropdown";
import Autocomplete from "react-google-autocomplete";

const RestaurantCreateForm = ({
    values, specialitiesList, handleChange, handleImageChange, handleCheckBoxChange, handleSelect, handleCity, handleSubmit
}) => {
    const {title, instagram, halal, onlyDelivery, specialities, street, zip} = values
    
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
                    placeholder='Nom du restaurant' 
                    className='form-control'
                    value={title}
                    required="required"
                />
            </div>
            <div className='form-group mb-3'>
                <input 
                    type='text' 
                    name='instagram' 
                    onChange={handleChange} 
                    placeholder='Instagram' 
                    className='form-control'
                    value={instagram}
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
            <div className='form-group mb-3'>
                <Multiselect
                    size="large" 
                    options={specialitiesList}
                    placeholder="Spécialités"
                    displayValue="name"
                    value={specialities}
                    onSelect={handleSelect}
                    onRemove={handleSelect}
                />
            </div>
            <div className='form-group mb-3'>
                <div className="form-check form-switch">
                    <input 
                        type='checkbox' 
                        name='halal' 
                        onChange={handleCheckBoxChange} 
                        className='form-check-input'
                        checked={halal} 
                    />
                    <label className="form-check-label">Halal</label>
                </div>
            </div>
            <div className='form-group mb-3'>
                <div className="form-check form-switch">
                    <input 
                        type='checkbox' 
                        name='onlyDelivery' 
                        onChange={handleCheckBoxChange} 
                        className='form-check-input'
                        checked={onlyDelivery} 
                    />
                    <label className="form-check-label">Uniquement livraison</label>
                </div>
            </div>

            <button className='btn btn-outline-primary m-2'>Ajouter</button>
        </form>
    )
}

export default RestaurantCreateForm;