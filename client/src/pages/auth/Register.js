import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm';
import { register } from '../../actions/auth';

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const isAdmin = false;
            await register({
                firstName, lastName, email, password, isAdmin
            });
            toast.success('Enregistrement avec succès. Veuillez connecter');
            navigate("/login");
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondary p-4 text-center">
                <h1>Créer un compte</h1>
            </div>

            <div className='container'>
            <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <RegisterForm 
                            handleSubmit={handleSubmit}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
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

export default Register;