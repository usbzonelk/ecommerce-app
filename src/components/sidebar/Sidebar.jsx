import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {Link} from "react-router-dom";
import logo from "../../images/logo.png";


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to="/" style={{textDecoration:"none"}}>
                <img src={logo} alt="" />
                </Link>
               </div>
            <hr/>
            <div className="center">
                <ul>
                <p className="title">Main</p>
                    <Link to="/" style={{textDecoration:"none"}}>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                    </Link>
                    <p className="title">Lists</p>
                    <Link to="/users" style={{textDecoration:"none"}}>
                    <li>
                        <PeopleAltIcon className="icon"/>
                        <span>Users</span>
                    </li>
                    </Link>
                    <Link to="/products" style={{textDecoration:"none"}}>
                    <li>
                        <CategoryIcon className="icon"/>
                        <span>Products</span>
                    </li>
                    </Link>
                
                    <p className="title">Useful Links</p>

                    <li>
                        <NotificationsIcon className="icon"/>
                        <span>Notifications</span>
                    </li>
                    <li>
                        <SettingsIcon className="icon"/>
                        <span>Settings</span>
                    </li>
                    <p className="title">Administrator</p>

                    <li>
                        <AccountCircleIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutIcon className="icon"/>
                        <span>Log out</span>
                        
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default Sidebar