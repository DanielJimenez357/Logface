import {Navigate} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth_Context.jsx'

function Protected_Route({children}) {
  const { user, loading } = useContext(AuthContext)
  const token = localStorage.getItem('access_token')

  if(loading){
    return(
    <div className="">
        {/*Componente pendiente de hacer para el frontend*/}
      Cargando
    </div>
    )
  }

  if(!token){
    return <Navigate to="/login" replace />
  }

  return children
}

export default Protected_Route
