import { Outlet } from 'react-router-dom'

function Main_Panel() {
  return (
    <>
      <div className="relative bg-gris1 w-full lg:w-10/12 ml-0 lg:ml-8 h-auto lg:h-full flex flex-col lg:flex-row shadow-xl shadow-gris2 items-center rounded-lg p-3 justify-center overflow-y-auto">
        <Outlet />
      </div>
    </>
  )
}

export default Main_Panel
