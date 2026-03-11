import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { obtenerUsuarios } from './services/api.js'

function App() {
  const [count, setCount] = useState(0)

  return(
  <>
    <div>Hola</div>
    <button onClick={() => obtenerUsuarios()}>Hola</button>

    </>

  ) 
}

export default App
