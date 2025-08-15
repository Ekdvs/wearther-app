import React from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import Home from './pages/Home';
import City from './pages/City';



const App: React.FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='/city' element={<City />} />
      </Route>
    )
  )

  return (
    <div className="bg-home-bg bg-cover h-[100vh] overflow-y-scroll text-white font-poppins">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
