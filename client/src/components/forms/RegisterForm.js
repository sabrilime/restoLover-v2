const RegisterForm = ({
    handleSubmit, 
    firstName, 
    setFirstName, 
    lastName, 
    setLastName, 
    email, 
    setEmail, 
    password, 
    setPassword
}) => (
    <form onSubmit={handleSubmit} className="mt-3">
        <div className='form-group mb-3'>
            <label className='form-label'>Prénom</label>
            <input 
                type='text' 
                className='form-control' 
                placeholder='Entrez votre prénom' 
                value={firstName}
                onChange={e => setFirstName(e.target.value)} 
            />
        </div>
        <div className='form-group mb-3'>
            <label className='form-label'>Nom</label>
            <input 
                type='text' 
                className='form-control' 
                placeholder='Entrez votre nom' 
                value={lastName}
                onChange={e => setLastName(e.target.value)} 
            />
        </div>
        <div className='form-group mb-3'>
            <label className='form-label'>Adresse mail</label>
            <input 
                type='email' 
                className='form-control' 
                placeholder='Entrez votre adresse mail' 
                value={email}
                onChange={e => setEmail(e.target.value)} 
            />
        </div>
        <div className='form-group mb-3'>
            <label className='form-label'>Mot de passe</label>
            <input 
                type='password' 
                className='form-control' 
                placeholder='Entrez votre mot de passe' 
                value={password}
                onChange={e => setPassword(e.target.value)} 
            />
        </div>
        <button disabled={!firstName || !lastName ||!email || !password} className='btn btn-primary'>
            Créer un compte
        </button>
    </form>
);

export default RegisterForm;