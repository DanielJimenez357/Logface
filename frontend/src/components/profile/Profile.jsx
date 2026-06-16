import Profile_Picture from "./Profile_Picture.jsx"
import Button from '../main/Button.jsx'
import Acces_Log from './Acces_Log.jsx'
import Roster_Calculator from './Roster_Calculator.jsx'
import Graph from './Graph.jsx'
import { AuthContext } from '../../context/Auth_Context.jsx'
import { useContext, useState } from 'react'
import Change_Form from './Change_Form.jsx'

function Profile() {
  const context = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  const user = context.user

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-full justify-around items-center gap-8 lg:gap-4 p-4 lg:p-8 overflow-y-auto relative">
        
        <p className="absolute right-0 lg:right-[10%] p-2 px-8 bg-white border-b border-l border-r border-negro1 top-0 rounded-b-lg font-bold text-xs uppercase text-gray-500 tracking-wider">
          {user?.role}
        </p>
        
        <div className="w-full lg:w-2/10 h-auto lg:h-full flex flex-col justify-center items-center">
          <Profile_Picture username={user?.username} />
          <div className="flex flex-col justify-between h-auto mt-8 lg:mt-20 w-full max-w-xs">
            <Button onClick={() => setShowForm(true)} title="Cambiar contraseña" />
          </div>
        </div>
        
        <div className="w-full lg:w-3/10 h-auto lg:h-full flex flex-col justify-center items-center">
          <Acces_Log />
        </div>
        
        <div className="w-full lg:w-3/10 h-auto lg:h-full flex flex-col justify-center items-center gap-6">
          <Roster_Calculator />
          <Graph />
        </div>
        
        <Change_Form visible={showForm} onClose={() => setShowForm(false)} placeholder="Nueva contraseña"/>
      </div>
    </>
  )
}

export default Profile
