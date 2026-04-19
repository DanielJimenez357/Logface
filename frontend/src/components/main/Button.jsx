function Button({title}) {
  return (
  <>
    <div className="bg-gris2 rounded-3xl text-white border border-negro1 p-4 ps-8 pe-8 text-center hover:cursor-pointer hover:brightness-125 active:brightness-75">
      {title}
    </div>
    </>
  )  
}

export default Button
