import { Navigate, useLocation } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function ProtectedRoute({ children }) {
  const { adminSession } = useAdmin()
  const location = useLocation()
  if (!adminSession) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }
  return children
}
