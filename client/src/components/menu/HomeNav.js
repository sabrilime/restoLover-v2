import { Link } from 'react-router-dom';

const HomeNav = () => {
    const active = window.location.pathname;

    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/home" && "active"}`} to="/home">
                    Spécialités
                </Link>
            </li>
            <li className='nav-item'>
                <Link className={`nav-link ${active === "/countries" && "active"}`} to="/countries">
                    Localisation
                </Link>
            </li>
        </ul>
    )
};

export default HomeNav;