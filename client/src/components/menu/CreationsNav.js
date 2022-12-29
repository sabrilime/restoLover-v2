import { Link } from 'react-router-dom';

const CreationsNav = () => {
    const active = window.location.pathname;

    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/creations/restaurants" && "active"}`} to="/creations/restaurants">
                    Restaurants
                </Link>
            </li>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/creations/activities" && "active"}`} to="/creations/activities">
                    Activités
                </Link>
            </li>
        </ul>
    )
};

export default CreationsNav;