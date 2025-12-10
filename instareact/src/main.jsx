import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{ createBrowserRouter, RouterProvider }from 'react-router-dom'
import ViewStory from './ViewStory.jsx'
import { StrictMode } from 'react'
import Profiles from './Profiles.jsx'
import Share from './Share.jsx'
import Search from './Search.jsx'

const router=createBrowserRouter(
  [
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/story/:id/:tom',
    element:<ViewStory/>
  },
  {
    path:'/profiles',
    element:<Profiles/>
  },
  {
    path:'/share',
    element:<Share/>
  },
  {
    path:'/search',
    element:<Search/>
  }
]
);
createRoot(document.getElementById('root')).render(
  <StrictMode>                    
    <RouterProvider router={router} />
    </StrictMode>,
  
)
