import {FiX} from "react-icons/fi"
import { CgProfile } from "react-icons/cg";

function Task_Details({show, onClose}) {
  return (
  <>
    <div className="bg-white w-[17.5%] h-full rounded-e-lg border-negro1 border absolute top-0 right-full flex flex-col  ">
      <div className="flex flex-row relative justify-center text-center border-b border-negro1">
        <p className="w-6/12">Asesoramiento cliente nº3</p>
          <FiX className="text-3xl right-0  absolute hover:scale-125 transition-all hover:cursor-pointer" />
      </div>
        <div className="pt-5 pb-5">
          <p>Compañeros: </p>
          <div className="flex flex-row">
          <CgProfile />
          <CgProfile />
          <CgProfile />
          <CgProfile />
          <CgProfile />
          </div>
        </div>
        <div  className="pt-2 pb-5">
          <p>Descripcion:</p>
          <p className="border-negro1 border bg-gris1 rounded-lg" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <div  className="pt-2 pb-2">
          <p>Fecha limite estimada:  </p>
          <p className="w-full bg-rojo1 text-white border border-negro1 rounded-2xl text-center p-0 text-xl hover:brightness-125 hover:cursor-default"> 19/06/26 </p>
        </div>
    </div>
    </>
  )
}

export default Task_Details
