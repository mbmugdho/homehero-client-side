import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import './index.css'
import './App.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import CustomCursor from './components/CustomCursor/CustomCursor.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CustomCursor />
    <RouterProvider router={router} />
  </AuthProvider>
)
