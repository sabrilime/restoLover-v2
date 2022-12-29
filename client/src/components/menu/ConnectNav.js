import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const ConnectNav = () => {
    const {auth} = useSelector((state) => ({ ...state }));
    const { user } = auth;
    return (
        <div className='d-flex justify-content-around'>
            <Card>
                <Meta 
                    avatar={<Avatar>{user.firstName[0]}</Avatar>} 
                    title={user.firstName +" "+user.lastName}
                />
            </Card>
        </div>
    )
};

export default ConnectNav;