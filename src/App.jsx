import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

import Home from './pages/Home/Home.jsx';
import Services from './pages/Services/Services.jsx';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails.jsx';
import AddService from './pages/AddService/AddService.jsx';
import MyServices from './pages/MyServices/MyServices.jsx';
import MyBookings from './pages/MyBookings/MyBookings.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/my-services" element={<MyServices />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}