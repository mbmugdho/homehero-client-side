import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout.jsx'
import Home from '../pages/Home/Home.jsx'
import Services from '../pages/Services/Services.jsx'
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails.jsx'
import AddService from '../pages/AddService/AddService.jsx'
import MyServices from '../pages/MyServices/MyServices.jsx'
import MyBookings from '../pages/MyBookings/MyBookings.jsx'
import Profile from '../pages/Profile/Profile.jsx'
import Login from '../pages/Login/Login.jsx'
import Register from '../pages/Register/Register.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'
import ProviderAddService from '../pages/ProviderAddService/ProviderAddService.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { API_BASE_URL } from '../config'
import EditProfile from '../pages/EditProfile/EditProfile.jsx'

const RequireAuth = ({ children }) => {
  const { isAuthed, ready } = useAuth()
  const location = useLocation()
  if (!ready) {
    return (
      <div className="container-x py-16 flex justify-center">
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
  if (!res.ok)
    throw new Response('Failed to load services', { status: res.status })
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
      {
        path: 'add-service',
        element: (
          <RequireAuth>
            <AddService />
          </RequireAuth>
        ),
      },
      {
        path: 'my-services',
        element: (
          <RequireAuth>
            <MyServices />
          </RequireAuth>
        ),
      },
      {
        path: 'my-bookings',
        element: (
          <RequireAuth>
            <MyBookings />
          </RequireAuth>
        ),
      },
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: 'edit-profile',
        element: (
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        ),
      },
      {
        path: 'provider/add-service',
        element: (
          <RequireAuth>
            <ProviderAddService />
          </RequireAuth>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
