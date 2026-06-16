import Header from './Header.jsx'
import Navbar from './Navbar.jsx'
import Main_Panel from './Main_Panel.jsx'

function Layout() {
  return (
  <>
    <Header />
      <div className="w-full h-auto lg:h-[80vh] flex flex-col lg:flex-row mt-6 lg:mt-12 px-4 lg:px-0 gap-4 lg:gap-0">
        <Navbar />
        <Main_Panel />
      </div>
    </>
  )
}

export default Layout
