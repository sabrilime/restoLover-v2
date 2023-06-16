import { useNavigate } from 'react-router-dom';
import { ShopOutlined } from "@ant-design/icons";
import { FaHamburger } from "react-icons/fa";

const SmallCard = ({ id, name, link, address="" }) => { 
    const navigate = useNavigate();

    const handleClick = async() => {
        navigate(link);
    };

    return (
        <div key={id} className="SpecialityCard col-sm-3" onClick ={handleClick}>
            <div className="card card-inverse card-info h-100 text-bg-dark p-3 text-center pt-2">
                <div className="card-block card-title">
                    <h1 className="mb-2">
                        {name === "Burger" ?
                            <FaHamburger className='h3 pt-2'/>
                        :
                            <ShopOutlined className='h3 pt-2'/>
                        }
                    </h1>
                    <h4 className="text-light">{name}</h4>
                    <h5 className="text-warning">{address}</h5>
                </div>
            </div>
            <br />
        </div>
    )};

export default SmallCard;

