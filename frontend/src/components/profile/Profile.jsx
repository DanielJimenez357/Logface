import Profile_Picture from "./Profile_Picture.jsx"
import Button from '../main/Button.jsx'
import Acces_Log from './Acces_Log.jsx'
import Roster_Calculator from './Roster_Calculator.jsx'
import Graph from './Graph.jsx'

function Profile() {
  return (
  <>
    <div className="flex flex-row w-full  h-full justify-center items-center">
      <p className="absolute right-[10%] p-2 pe-8 ps-8 bg-white border-b border-l border-r border-negro1 top-0 rounded-b-lg">Empleado</p>
        <div className="w-2/10 h-full flex flex-col justify-center">
          <Profile_Picture />
          <Button title="Cambiar contraseña"  />
          <Button title="Cambiar correo" />
        </div>
        <div className="w-2/10 h-full flex-col flex justify-center">
          <Acces_Log />
        </div>
        <div className="w-4/10 h-full flex flex-col justify-center items-center">
          <Roster_Calculator />
          <Graph />
        </div>
    </div>
    </>
  )
}

export default Profile
