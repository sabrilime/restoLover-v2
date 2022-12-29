import { Link } from 'react-router-dom';

const ActivityNav = () => {
    const active = window.location.pathname;

    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/activities" && "active"}`} to="/activities">
                    Activités
                </Link>
            </li>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/activities-countries" && "active"}`} to="/activities-countries">
                    Localisation
                </Link>
            </li>
        </ul>
    )
};

export default ActivityNav;