function Create_Button({onClick, active, content}) {
  return (
  <>
      <div onClick={onClick} className=" bg-gris2 rounded-3xl text-white border border-negro1 p-4 ps-8 pe-8 text-center hover:cursor-pointer hover:brightness-125 active:brightness-75">
        <p >{content}</p>
      </div>

    </>
  )
}

export default Create_Button
