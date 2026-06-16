import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/Auth_Context.jsx'
import apiDjango from '../../services/api.js'

function Profile_Picture() {
  const { user, setUser } = useContext(AuthContext)
  const [upload, setUpload] = useState(false)

  const base_url = import.meta.env.VITE_API_URL 

  const handleFotoChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUpload(true)

    const response_package = new FormData();
    response_package.append('foto', file);

    try {
      const response = await apiDjango.patch('/api/profile/', response_package, {
        headers: {
          'Content-Type': 'multipart/form-data',         },
      });

      setUser(response.data)
      alert("Foto de perfil actualizada")

    } catch (error) {
      console.error("Error al subir la imagen", error)
      alert("No se pudo subir la imagen")
    } finally {
      setUpload(false)
    }
  }
  const getFotoUrl = () => {
    if (!user?.foto) {
      return "https://via.placeholder.com/150";     }

    if (user.foto.startsWith('http')) {
      return user.foto;
    }

    if (user.foto.startsWith('/media/')) {
      return `${base_url}${user.foto}`;
    }

    if (user.foto.startsWith('perfil/')) {
      return `${base_url}/media/${user.foto}`;
    }
    return `${base_url}/media/perfil/${user.foto}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative group w-64 h-64">
        
        {!user?.foto ? (
          <div className="w-full h-full rounded-full bg-gris2 text-white border-2 border-negro1 shadow shadow-gris2 flex items-center justify-center text-center p-4 text-xs font-bold uppercase tracking-wider leading-tight">
            Foto de Perfil
          </div>
        ) : (
          <img 
            src={getFotoUrl()} 
            alt="Foto de perfil" 
            className="w-full h-full rounded-full object-cover border-2 border-negro1 shadow shadow-gris2"
          />
        )}

        <label 
          htmlFor="file-upload" 
          className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer font-bold text-center z-10"
        >
          {upload ? "Subiendo..." : "Cambiar Foto"}
        </label>

        <input 
          id="file-upload" 
          type="file" 
          accept="image/*"
          onChange={handleFotoChange} 
          className="hidden" 
          disabled={upload}
        />
      </div>
      <p className="font-bold text-gray-800">{user?.username}</p>
    </div>
  )
}

export default Profile_Picture;
