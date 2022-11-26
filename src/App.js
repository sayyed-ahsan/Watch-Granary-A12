import logo from './logo.svg';
import './App.css';
import Header from './pages/Shared/Header/Header';
import Footer from './pages/Shared/Footer/Footer';
import { RouterProvider } from 'react-router-dom';
import router from './Routs/Routs/Routs';

function App() {
  return (
    <div className='mx-auto max-w-[1200px]'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
