import { createContext, useContext, useState } from "react";

const AdminContext = createContext()


const AdminContextProvider = ({ children }) => {

    const [adminDetails, setAdminDetails] = useState('this is admin')

    return (
        <AdminContext.Provider value={{adminDetails,setAdminDetails}}>
            {children}
        </AdminContext.Provider>
    )

}

const useAdminContext = () => {
    return useContext(AdminContext)
}

export {
    AdminContextProvider,
    useAdminContext
}