import {Link, useLocation } from 'react-router-dom';

const RestaurantBreadcrumbs = ({name}) => {
    const location = useLocation();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {location.pathname.indexOf('speciality') !== -1 ?
                                <>
                                    <li className="breadcrumb-item">
                                        <Link to="/home" className="breadcrumb-active">
                                            Spécialités
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">{name}</li>
                                </>
                            :
                                <>
                                    <li className="breadcrumb-item">
                                        <Link to="/countries" className="breadcrumb-active">
                                            Pays
                                        </Link>
                                    </li>
                                    {location.pathname.indexOf('cities') !== -1 
                                    ?
                                        <li className="breadcrumb-item active" aria-current="page">{name}</li>
                                    :
                                        <>
                                            <li className="breadcrumb-item">
                                                <Link to={`/cities/${name}`} className="breadcrumb-active">
                                                    Pays
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">{name}</li>
                                        </>
                                    }
                                </>
                            }
                        </ol>
                    </nav>
                </div>
            </nav>
        </>
    )
};

export default RestaurantBreadcrumbs;