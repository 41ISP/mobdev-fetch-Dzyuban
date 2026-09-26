import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
    return (
        <div className="app">
            <Sidebar />
            <div className="main">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
