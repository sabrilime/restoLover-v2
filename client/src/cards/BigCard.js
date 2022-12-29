import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import { HeartOutlined, EditOutlined, HeartTwoTone } from "@ant-design/icons";

const BigCard = ({ 
    creation, 
    name, 
    image, 
    owner=false,
    favourite=false,
    handleChange
}) => { 

    return (
        <div className='row'>
            <div className='col-md-6'>
                <br />
                <img src={image} alt={creation.title} className='img img-fluid m-2' />
            </div>
            <div className='col-md-6'>
                <br />
                <div className='d-flex justify-content-between h4'>
                        <>
                            { favourite
                                ? <h1 onClick={handleChange} className="mb-2"><HeartOutlined className='h5 pt-2'/></h1>
                                : <h1 onClick={handleChange} className="mb-2"><HeartTwoTone className='h5 pt-2'/></h1>
                            }
                            {owner && (
                            <Link to={`/${name}/edit/${creation._id}`}>
                                <EditOutlined className='text-warning' />
                            </Link>
                            )}
                        </>
                </div>
                {creation.address && 
                <p className='alert alert-info mt-3'>
                    <a 
                        className="custom-style" 
                        href={`https://maps.google.com/?q=${creation.address.street}+${creation.address.city}+${creation.address.country}`} 
                        target="_blank" 
                        rel="noopener noreferrer">
                        {creation.address.street+", "+creation.address.zip+", "+creation.address.city}
                        <br />
                        {creation.address.country}
                    </a>
                </p>
                }
                {creation.type 
                    ?
                        <p>Type: {creation.type}</p>
                    :
                        <>
                            <p>Halal: {creation.halal ? "Oui" : "Non"}</p>
                            <p>Seulement livraison: {creation.onlyDelivery ? "Oui" : "Non"}</p>
                        </>
                }
                <i>Ajouté par <b>{creation.postedBy && creation.postedBy.firstName +" "+creation.postedBy.lastName}</b></i>
                {creation.instagram &&
                    <>
                        <br /><br />
                        <SocialIcon target="_blank" url={`https://www.instagram.com/${creation.instagram}`} />
                    </>
                }
                <br />
                {creation.specialities && 
                    <p className='alert alert-info mt-3'>
                        <b>Spécialités:</b><br />
                        {creation.specialities.map(speciality => 
                            <Link key={speciality._id} className="nav-link active" to={`/speciality/${speciality._id}`}>
                                {speciality.name}
                            </Link>
                        )}
                    </p>
                }
            </div>
        </div>
    )};

export default BigCard;

