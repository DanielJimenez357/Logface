import { useState, useEffect } from 'react'
import './App.css'
import { crearUsuario, obtenerUsuarios } from './services/api.js'

function App() {
  const [count, setCount] = useState(0)

  return(
  <>
    <div className="bg-red-500">Hola</div>
    <button onClick={() => obtenerUsuarios()}>Hola</button>


    <button onClick={() => crearUsuario()}>Crear usuario</button>

    </>
  ) 
}

export default App
