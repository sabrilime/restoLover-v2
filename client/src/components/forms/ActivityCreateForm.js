import countries from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";
import { Select } from 'antd';

const { Option } = Select;

const ActivityCreateForm = ({
    values, setValues, handleChange, handleImageChange, handleSubmit
}) => {
    const {title, type, street, zip, city} = values

    countries.registerLocale(frLocale);
    const countryObj = countries.getNames("fr", { select: "official" });
    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
          label: value,
          value: key
        };
    });
    
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
                <input 
                    type='text' 
                    name='city' 
                    onChange={handleChange} 
                    placeholder='Ville' 
                    className='form-control'
                    value={city}
                />
            </div>
            <div className='form-group mb-3'>
                <Select
                    showSearch
                    onChange={(label) => setValues({...values, country: label})} 
                    className="w-100 m-2" 
                    size="large" 
                    placeholder="Pays"
                >
                    {!!countryArr?.length &&
                    countryArr.map(({ label, value }) => (
                        <Option key={value} value={label}>
                            {label}
                        </Option>
                    ))}
                </Select>
            </div>

            <button className='btn btn-outline-primary m-2'>Ajouter</button>
        </form>
    )
}

export default ActivityCreateForm;