import { CgProfile } from "react-icons/cg";
import AuthProvider from '../../context/Auth_Context.jsx'

function Profile_Picture() {
  return (
  <>
    <div className="bg-white rounded-lg border border-negro1 justify-center items-center flex flex-col p-5">
      <CgProfile className="size-48" />
      <p className="text-2xl"></p>
    </div>
    </>
  )
}

export default Profile_Picture
