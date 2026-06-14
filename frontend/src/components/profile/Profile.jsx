import Profile_Picture from "./Profile_Picture.jsx"
import Button from '../main/Button.jsx'
import Acces_Log from './Acces_Log.jsx'
import Roster_Calculator from './Roster_Calculator.jsx'
import Graph from './Graph.jsx'
import { AuthContext } from '../../context/Auth_Context.jsx'
import {useContext} from 'react'
import Change_Form from './Change_Form.jsx'

function Profile() {
  const context = useContext(AuthContext)
  const user = context.user
  return (
  <>
    <div className="flex flex-row w-full  h-full justify-around items-center">
      <p className="absolute right-[10%] p-2 pe-8 ps-8 bg-white border-b border-l border-r border-negro1 top-0 rounded-b-lg">{user.role}</p>
        <div className="w-2/10 h-full flex flex-col justify-center">
          <Profile_Picture username={user.username} />
          <div className="flex flex-col justify-between h-2/10 mt-20">
          <Button title="Cambiar contraseña"  />
          <Button title="Cambiar correo" />
          </div>
        </div>
        <div className="w-2/10 h-full flex-col flex justify-center">
          <Acces_Log />
        </div>
        <div className="w-2/10 h-full flex flex-col justify-center items-center">
          <Roster_Calculator />
          <Graph />
        </div>
        <Change_Form visible={true} placeholder="codigo"/>
    </div>
    </>
  )
}

export default Profile
