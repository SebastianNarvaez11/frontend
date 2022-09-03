import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom";
import Sidebar from '../../components/Sidebar'
import SubSidebar from '../../components/SubSidebar'


const Layout = () => {

    const { sidebarActive } = useSelector(state => state.ui)

    return (
        <div className="d-flex flex-row" style={{ height: '100%', backgroundColor: '#FCFEFF' }}>
            <Sidebar />
            {sidebarActive !== '' && <SubSidebar />}
            <div style={{ paddingLeft: 40, width: '-webkit-fill-available' }}>
                {/* <Navbar /> */}
                <Outlet />
            </div>
        </div>
    )
}

export default Layout