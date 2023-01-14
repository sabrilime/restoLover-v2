import {Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaSistrix } from "react-icons/fa";

const TopNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.removeItem('auth');
    navigate('/login');
  }

  return (
    <div className='navbar navbar-dark bg-light'>

      {auth !== null && (
        <>
          <Link className='nav-link' to="/home">
            Restaurants
          </Link>
          <Link className='nav-link' to="/activities">
            Activités
          </Link>
          <Link className='nav-link' to="/favourite/restaurants">
            Favoris
          </Link>
          <Link className='nav-link' to="/creations/restaurants">
            Mes créations
          </Link>
          <Link className='nav-link' to="/search">
            <FaSistrix />
          </Link>
        </>
      )}

      { auth !== null && (
        <a className='nav-link pointer' onClick={logout} href={() => false}>Déconnexion</a>
      )}

      {auth === null && (
        <>
          <Link className='nav-link' to="/login">
            Connexion
          </Link>
          <Link className='nav-link' to="/register">
            Créer un compte
          </Link>
        </>
      )}
    </div>
)};

export default TopNav;