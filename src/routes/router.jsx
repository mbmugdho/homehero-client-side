import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import Home from '../pages/Home/Home.jsx'
import Services from '../pages/Services/Services.jsx'
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails.jsx'
import Login from '../pages/Login/Login.jsx'
import Register from '../pages/Register/Register.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'
import LoadingPage from '../components/LoadingPage/LoadingPage.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { API_BASE_URL } from '../config'

// Dashboard Pages
import DashboardHome from '../pages/Dashboard/DashboardHome.jsx'
import MyBookings from '../pages/MyBookings/MyBookings.jsx'
import MyServices from '../pages/MyServices/MyServices.jsx'
import ProviderAddService from '../pages/ProviderAddService/ProviderAddService.jsx'
import Profile from '../pages/Profile/Profile.jsx'
import EditProfile from '../pages/EditProfile/EditProfile.jsx'
import AddService from '../pages/AddService/AddService.jsx'

// other Pages
import About from '../pages/About/About.jsx'
import Contact from '../pages/Contact/Contact.jsx'
import Terms from '../pages/Terms/Terms.jsx'

const RequireAuth = ({ children }) => {
  const { isAuthed, ready } = useAuth()
  const location = useLocation()
  
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary" />
      </div>
    )
  }
  
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  
  return children
}

const fetchServices = async ({ request }) => {
  const url = new URL(request.url)
  const qs = url.search || ''
  const res = await fetch(`${API_BASE_URL}/services${qs}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Response('Failed to load services', { status: res.status })
  return res.json()
}

const fetchServiceById = async ({ params }) => {
  const res = await fetch(`${API_BASE_URL}/services/${params.id}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Response('Service not found', { status: res.status })
  return res.json()
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'services',
        element: <Services />,
        loader: fetchServices,
        errorElement: <NotFound />,
      },
      {
        path: 'service/:id',
        element: <ServiceDetails />,
        loader: fetchServiceById,
        errorElement: <NotFound />,
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      
      // Additional Pages
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Terms /> }, 
      
      {
        path: 'add-service',
        element: (
          <RequireAuth>
            <AddService />
          </RequireAuth>
        ),
      },
      
      { path: '*', element: <NotFound /> },
    ],
  },
  
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'bookings', element: <MyBookings /> },
      { path: 'services', element: <MyServices /> },
      { path: 'add-service', element: <ProviderAddService /> },
      { path: 'profile', element: <Profile /> },
      { path: 'edit-profile', element: <EditProfile /> },
    ],
  },
])

export default router