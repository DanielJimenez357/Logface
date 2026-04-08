function User_Info({user}) {
 return (
 <>
    <div className="flex flex-col p-2 bg-white items-center border border-negro1 rounded-lg">
        <p>*Imagen perfil*</p>
        <p>{user}</p>
        <p className="bg-gris1 border border-negro1 hover:bg-gris2 active:bg-gris1 cursor-pointer transition-colors p-1 rounded-lg">Responder</p>
    </div>
    </>
 ) 
}

export default User_Info
