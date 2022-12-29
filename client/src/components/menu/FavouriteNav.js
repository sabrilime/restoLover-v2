import { Link } from 'react-router-dom';

const FavouriteNav = () => {
    const active = window.location.pathname;

    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/favourite/restaurants" && "active"}`} to="/favourite/restaurants">
                    Restaurants
                </Link>
            </li>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/favourite/activities" && "active"}`} to="/favourite/activities">
                    Activités
                </Link>
            </li>
        </ul>
    )
};

export default FavouriteNav;