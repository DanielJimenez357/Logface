import {Navigate} from 'react-router-dom'

function Protected_Route({children}) {
  const token = localStorage.getItem('access_token')

  if(!token){
    return <Navigate to="/login" replace />
  }

  return children
}

export default Protected_Route
