import login_image from '../../assets/login_image.png'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'
import Pills_Loader from '../loading/Pills_Loader.jsx'
import { AuthContext } from '../../context/Auth_Context.jsx'
import { useContext } from 'react'

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
      setReload(reload=> !reload)
      navigate('/')
    }
    else {
      setError(data.detail || "Usuario o contraseña incorrectos")
    } } catch (err) {
      console.error("Error del servidor: ", err)
      setError("No se pudo conectar con el servidor, intentelo de nuevo mas tarde")
    } finally {
      setIsLoading(false)
    }
  }


  return (
  <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
    <div className="bg-gris1 w-6/10 h-6/10 rounded-3xl flex flex-row shadow shadow-gris2">
      <div className="w-5/10 h-full">
        <img className="object-fill rounded-l-3xl w-full h-full" src={login_image} alt="" />
      </div>
        <div className="flex flex-col justify-start p-5 w-5/10 h-full items-center z-10">
            {isLoading && (<div className="absolute top-[50%] align-middle">
           <Pills_Loader /> 
          </div>)}
          <div className={`w-full h-full items-center flex flex-col ${isLoading ? "blur-md" : ""}`}>
            <p className="text-5xl w-full text-center mb-[10%]">Iniciar Sesion</p>
              {error && (<motion.p initial={{ opacity: 0, y: -20}} animate={{ opacity:1, y: 0}} className="text-center rounded-lg bg-rojo2 p-3 mb-[3%] ">{error}</motion.p>)}
            <form onSubmit={handleLogin} className="flex flex-col justify-between h-5/10 w-5/10 items-center">            
              <input className="bg-white outline-none duration-300 ease-in-out shadow-sm  w-full p-3 rounded-3xl transition-all focus:border-rojo1 focus:ring-4 focus:ring-rojo1/30 " placeholder="Usuario" type="text" required value={username} onChange={(e)=> setUsername(e.target.value)} disabled={isLoading}/>
              <input className="bg-white outline-none duration-300 ease-in-out shadow-sm  w-full p-3 rounded-3xl transition-all focus:border-rojo1 focus:ring-4 focus:ring-rojo1/30" placeholder="Contraseña" type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} disabled={isLoading} />
              <button type="submit" disabled={isLoading} className="bg-rojo1 text-white text-center rounded-3xl p-2 ps-6 pe-6 border border-negro1  hover:brightness-125 active:brightness-75 hover:cursor-pointer">Entrar</button>
            </form>
          </div>

        </div>
    </div>
          </div>

    </>
  )
}

export default Login
