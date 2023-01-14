import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './AllRoutes';
import TopNav from './components/menu/TopNav';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position='top-center' />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
