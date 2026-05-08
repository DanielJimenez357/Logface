import { createContext, useState, useEffect} from 'react'
import apiDjango from '../services/api.js'

const AuthContext = createContext()

function const AuthProvider = ({children}) {
  const [user, setUser] = useState(null)

  useEffect(()=> {
  const loadProfile = async () => {
    const token = localStorage.getItem('acces_token')
    if (token) {
      try{
        const response = await apiDjango.get('/api/profile')
        setUser(response.data)
      }
      catch (error){
        console.error("Error validando sesion", error)
        setUser(null)
      }
    }
  }
  loadProfile()
}, [])
}


  return(
  <AuthContext.Provider value={{user, setUser}}>
    {children}
  </AuthContext.Provider>
  )
  
}
