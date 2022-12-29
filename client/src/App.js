import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import TopNav from './components/menu/TopNav';

//Components
import Login from './pages/auth/Login';
import Register from "./pages/auth/Register";
import Home from './pages/restaurants/Home';
import SpecialityRestaurants from './pages/restaurants/SpecialityRestaurants';
import ViewRestaurant from './pages/restaurants/ViewRestaurant';
import CityRestaurants from './pages/restaurants/CityRestaurants';
import NewRestaurant from './pages/restaurants/NewRestaurant';
import OnlyDeliveryRestaurants from './pages/restaurants/OnlyDeliveryRestaurants';
import EditRestaurant from './pages/restaurants/EditRestaurant';
import Countries from './pages/address/Countries';
import Cities from './pages/address/Cities';
import Activities from './pages/activities/Activities';
import NewActivity from './pages/activities/NewActivity';
import ViewActivity from './pages/activities/ViewActivity';
import EditActivity from './pages/activities/EditActivity';
import ActivitiesCountries from './pages/address/ActivitiesCountries';
import ActivitiesCities from './pages/address/ActivitiesCities';
import CityActivities from './pages/activities/CityActivities';
import FavouriteRestaurants from './pages/favourites/FavouriteRestaurants';
import FavouriteActivities from './pages/favourites/FavouriteActivities';
import CreationRestaurants from './pages/creations/CreationRestaurants';
import CreationActivities from './pages/creations/CreationActivities';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position='top-center' />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route exact path="/speciality/:specialityId" element={<PrivateRoute> <SpecialityRestaurants /> </PrivateRoute>} />
        <Route exact path="/countries" element={<PrivateRoute> <Countries /> </PrivateRoute>} />
        <Route exact path="/cities/:country" element={<PrivateRoute> <Cities /> </PrivateRoute>} />
        <Route exact path="/restaurant/:restaurantId" element={<PrivateRoute> <ViewRestaurant /> </PrivateRoute>} />
        <Route exact path="/restaurants/city/:city" element={<PrivateRoute> <CityRestaurants /> </PrivateRoute>} />
        <Route exact path="/restaurants/new" element={<PrivateRoute> <NewRestaurant /> </PrivateRoute>} />
        <Route exact path="/speciality-delivery" element={<PrivateRoute> <OnlyDeliveryRestaurants /> </PrivateRoute>} />
        <Route exact path="/restaurant/edit/:restaurantId" element={<PrivateRoute> <EditRestaurant /> </PrivateRoute>} />
        <Route exact path="/activities" element={<PrivateRoute> <Activities /> </PrivateRoute>} />
        <Route exact path="/activities/new" element={<PrivateRoute> <NewActivity /> </PrivateRoute>} />
        <Route exact path="/activity/:activityId" element={<PrivateRoute> <ViewActivity /> </PrivateRoute>} />
        <Route exact path="/activity/edit/:activityId" element={<PrivateRoute> <EditActivity /> </PrivateRoute>} />
        <Route exact path="/activities-countries" element={<PrivateRoute> <ActivitiesCountries /> </PrivateRoute>} />
        <Route exact path="/activities-cities/:country" element={<PrivateRoute> <ActivitiesCities /> </PrivateRoute>} />
        <Route exact path="/activities/city/:city" element={<PrivateRoute> <CityActivities /> </PrivateRoute>} />
        <Route exact path="/favourite/restaurants" element={<PrivateRoute> <FavouriteRestaurants /> </PrivateRoute>} />
        <Route exact path="/favourite/activities" element={<PrivateRoute> <FavouriteActivities /> </PrivateRoute>} />
        <Route exact path="/creations/restaurants" element={<PrivateRoute> <CreationRestaurants /> </PrivateRoute>} />
        <Route exact path="/creations/activities" element={<PrivateRoute> <CreationActivities /> </PrivateRoute>} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
