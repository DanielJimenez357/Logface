import { createContext, useState, useEffect} from 'react'
import apiDjango from '../services/api.js'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)

  useEffect(()=> {
  const loadProfile = async () => {
  
    setLoading(true)

    const token = localStorage.getItem('access_token')
    if (token) {
      try{
        const response = await apiDjango.get('/api/profile/')
        setUser(response.data)
      }
      catch (error){
        console.error("Error validando sesion", error)
        setUser(null)
      }
    }
      else {
        setUser(null)
      }
    setLoading(false)
  }
  loadProfile()
}, [reload])


  return(
  <AuthContext.Provider value={{user, setUser, loading, reload, setReload}}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider
