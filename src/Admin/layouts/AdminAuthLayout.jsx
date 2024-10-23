import { Outlet } from "react-router-dom"

const AdminAuthLayout = () => {
    return (
        <div className="bg-TK_bg min-h-screen flex items-center justify-center w-screen">
            <Outlet />

        </div>
    )
}

export default AdminAuthLayout
