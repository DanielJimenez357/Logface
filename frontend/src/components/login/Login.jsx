import login_image from '../../assets/login_image.png'

function Login() {
  return (
  <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        
    <div className="bg-gris1 w-6/10 h-6/10 rounded-3xl flex flex-row shadow shadow-gris2">
      <div className="w-5/10 h-full">
        <img className="object-fill rounded-l-3xl w-full h-full" src={login_image} alt="" />
      </div>
        <div className="flex flex-col justify-between p-5 w-5/10 h-full items-center">
          <p className="text-5xl w-full text-center">Iniciar Sesion</p>
            <div className="flex flex-col justify-between h-3/10 w-5/10 items-center">            
          <input className="bg-white outline-none duration-300 ease-in-out shadow-sm  w-full p-3 rounded-3xl transition-all focus:border-rojo1 focus:ring-4 focus:ring-rojo1/30 " placeholder="Usuario" type="text"/>
          <input className="bg-white outline-none duration-300 ease-in-out shadow-sm  w-full p-3 rounded-3xl transition-all focus:border-rojo1 focus:ring-4 focus:ring-rojo1/30" placeholder="Contraseña" type="text" />
            </div>

          <p className="bg-rojo1 text-white text-center rounded-3xl p-2 ps-6 pe-6 border border-negro1  hover:brightness-125 active:brightness-75 hover:cursor-pointer">Entrar</p>
        </div>
    </div>
          </div>

    </>
  )
}

export default Login
