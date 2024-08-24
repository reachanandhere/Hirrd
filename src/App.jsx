
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import AppLayout from './layouts/app-layout'


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      }
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router} /> 
  )
}

export default App
