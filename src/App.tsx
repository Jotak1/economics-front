import React from 'react';
import { IndicadoresScreen} from "./components/Indicadores";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {IndicadorScreen} from "./components/Indicador";

const router  = createBrowserRouter([
  {
    path: '/',
    element: <IndicadoresScreen />
  },
  {
    path: '/:id',
    element: <IndicadorScreen />
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
