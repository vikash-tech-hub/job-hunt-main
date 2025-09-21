import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role === "student") {
      navigate("/")
    }
  }, [user, navigate])

  if (!user || user.role === "student") {
    return null // or <Navigate to="/" /> if using react-router v6
  }

  return <>{children}</>
}

export default ProtectedRoute
