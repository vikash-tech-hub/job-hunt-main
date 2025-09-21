import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/login.jsx'
import Signup from './components/auth/signup.jsx'
import Home from './components/home.jsx'
import Jobs from './components/Jobs.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Jobdescription from './components/Jobdescription'
import Companies from './components/admin/companies'
import Companycreate from './components/admin/Companycreate'
import Companysetup from './components/admin/Companysetup'
import Adminjobs from './components/admin/Adminjobs'
import Postjob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProjectedRoutes'
const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  }, {
    path: "/description/:id",
    element: <Jobdescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },


  // admin ke liye
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies />
    </ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><Companycreate />
    </ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><Companysetup />
    </ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><Adminjobs />
    </ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><Postjob />
    </ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants />
    </ProtectedRoute>
  }

])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={approuter} />
    </>
  )
}

export default App
