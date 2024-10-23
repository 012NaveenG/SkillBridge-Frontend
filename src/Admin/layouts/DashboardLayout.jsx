import { Outlet } from "react-router-dom"
import Navbar from '../../Admin/components/Navbar.jsx'
import Sidebar from "../components/Sidebar"
import Footer from "../../components/Footer"

const DashboardLayout = () => {
  return (
    <div className="bg-TK_bg h-full overflow-hidden">
      <Navbar />
      <div className="p-2 flex  justify-center gap-2 overlflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default DashboardLayout
