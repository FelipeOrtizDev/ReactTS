import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VrfFechamento from './pages/vrfFechamento/vrfFechamento.tsx'
import Home from './pages/home/home.tsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/home',
      element: <Home/>
    },

    {
    path: '/vrffechamento',
    element: <VrfFechamento />
  }]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
