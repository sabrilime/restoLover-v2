import { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import LoginForm from '../../components/forms/LoginForm';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let res = await login({email, password});
            toast.success('Connexion avec succès');
            if(res.data) {
                //Save user and token to local storage
                window.localStorage.setItem('auth', JSON.stringify(res.data));
                //Save user and token to redux
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data,
                });
                navigate("/home");
            } 
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4 text-center">
                <h1>Se connecter</h1>
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <LoginForm 
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;