import { Outlet } from 'react-router-dom'

function Main_Panel() {
  return (
    <>
      <div className=" relative bg-gris1 w-10/12 ml-8 h-full flex flex-row shadow-xl shadow-gris2 items-center rounded-lg p-3 justify-center">
        <Outlet />
      </div>
    </>
  )
}

export default Main_Panel
