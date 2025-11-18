HomeHero — Local Household Service Finder

Connect with trusted local pros for cleaning, plumbing, electrical, and more. Browse services, view details, book via a friendly modal flow, and manage your bookings. Providers can add, edit, and delete their own services.


Live Links:
Client (Frontend): https://your-client.netlify.app
Server (API): https://your-server.vercel.app


Features:


Firebase Authentication:
Email/Password and Google login; private routes persist on reload
Booking Flow:
Book Now opens a modal preview → finalize date/time + price → create booking
My Bookings table with Cancel (DELETE)
Provider CRUD:
Add Service (private), My Services table, Edit (PATCH), Delete (DELETE) with ownership checks
Filters & Sorting:
Search, category chips, min/max price, sort by rating or price (server-backed)
Responsive UI + Animations:
Mobile/tablet/desktop layouts; Framer Motion transitions
Theme Toggle:
Light/Dark cosmic background toggle; buttons/cards/text remain cosmic
Tech Stack:
Frontend: React + Vite, Tailwind CSS + DaisyUI, Framer Motion, SweetAlert2, lucide icon, react icon
Auth: Firebase Authentication
Backend: Node.js, Express, MongoDB (Atlas)
Deployment: Netlify (client), Vercel (server)
