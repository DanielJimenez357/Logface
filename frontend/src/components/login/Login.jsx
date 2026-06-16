import login_image from '../../assets/login_image.png'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Pills_Loader from '../loading/Pills_Loader.jsx'
import { AuthContext } from '../../context/Auth_Context.jsx'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { setReload } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Rellena ambos campos")
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL

      const response = await fetch(`${apiUrl}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        console.log("Login correcto")
        setReload(reload => !reload)
        navigate('/')
      } else {
        setError(data.detail || "Usuario o contraseña incorrectos")
      } 
    } catch (err) {
      console.error("Error del servidor: ", err)
      setError("No se pudo conectar con el servidor, inténtelo de nuevo más tarde")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center px-4 bg-gray-50">
        
        <div className="bg-gris1 w-full max-w-sm md:max-w-none md:w-6/10 h-auto md:h-6/10 rounded-3xl flex flex-col md:flex-row shadow shadow-gris2 overflow-hidden py-8 md:py-0">
          
          <div className="hidden md:block md:w-5/10 h-full">
            <img className="object-cover w-full h-full" src={login_image} alt="Login Banner" />
          </div>
          
          <div className="flex flex-col justify-center w-full md:w-5/10 h-full items-center z-10 relative">
            
            <AnimatePresence>
              {isLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                  <Pills_Loader /> 
                </div>
              )}
            </AnimatePresence>

            <div className={`w-full h-full items-center justify-center flex flex-col transition-all duration-300 ${isLoading ? "blur-md pointer-events-none" : ""}`}>
              <p className="text-4xl lg:text-5xl w-full text-center mb-8 font-black text-gray-800">
                Iniciar Sesión
              </p>
              
              <div className="w-full flex justify-center min-h-[50px] mb-4">
                <AnimatePresence>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center rounded-xl bg-red-100 text-red-700 border border-red-200 p-3 text-xs font-bold w-[80%] md:w-6/10"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4 w-[85%] md:w-7/10 items-center">            
                <input 
                  className="bg-white border border-gray-200 outline-none duration-300 shadow-sm w-full p-3 rounded-3xl transition-all focus:border-rojo1 focus:ring-2 focus:ring-rojo1/20 text-sm" 
                  placeholder="Usuario" 
                  type="text" 
                  required 
                  value={username} 
                  onChange={(e)=> setUsername(e.target.value)} 
                  disabled={isLoading}
                />
                
                <input 
                  className="bg-white border border-gray-200 outline-none duration-300 shadow-sm w-full p-3 rounded-3xl transition-all focus:border-rojo1 focus:ring-2 focus:ring-rojo1/20 text-sm" 
                  placeholder="Contraseña" 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e)=> setPassword(e.target.value)} 
                  disabled={isLoading} 
                />
                
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="bg-rojo1 text-white text-center font-bold rounded-3xl py-2.5 px-8 border border-negro1 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-rojo1/25 mt-4 cursor-pointer text-sm"
                >
                  Entrar
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login
