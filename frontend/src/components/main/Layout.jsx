import Header from './Header.jsx'
import Navbar from './Navbar.jsx'
import Main_Panel from './Main_Panel.jsx'

function Layout() {
  return (
  <>
    <Header />
      <div className="w-full h-[80vh] flex row-auto mt-12">
        <Navbar />
        <Main_Panel />
      </div>
    </>
  )
}

export default Layout
