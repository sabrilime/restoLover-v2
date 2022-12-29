import { useNavigate } from 'react-router-dom';
import { ShopOutlined } from "@ant-design/icons";

const SmallCard = ({ id, name, link }) => { 
    const navigate = useNavigate();
    return (
        <div key={id} className="SpecialityCard col-sm-3" onClick ={() => navigate(link)}>
            <div className="card card-inverse card-info h-100 text-bg-dark p-3 text-center pt-2">
                <div className="card-block card-title">
                    <h1 className="mb-2"><ShopOutlined className='h5 pt-2'/></h1>
                    <h4 className="text-light">{name}</h4>
                </div>
            </div>
            <br />
        </div>
    )};

export default SmallCard;

