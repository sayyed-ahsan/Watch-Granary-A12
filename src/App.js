import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routs/Routs/Routs';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className='mx-auto max-w-[1200px]'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
