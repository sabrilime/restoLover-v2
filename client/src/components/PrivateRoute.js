import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const { auth }  = useSelector((state) => ({...state}));

    if (!auth) {
        return <Navigate to="/login" />;
    }
    return auth && auth.token ? children : <Navigate to="/login" />;
    
};

export default PrivateRoute;