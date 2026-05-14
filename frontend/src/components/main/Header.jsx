import {AuthContext} from '../../context/Auth_Context.jsx'
import {useContext} from 'react'
function Header() {
    
  const {user} = useContext(AuthContext)

  return (
    <>
<div className="items-center bg-gris1 shadow shadow-gris2">
  <div className="flex flex-row p-5 justify-between content-center">
    <h2 className="text-3xl">*LOGO*</h2>
    <h2 className="flex items-center justify-center">{user.username}</h2>
  </div>
</div>
    </>
  )
}

export default Header
