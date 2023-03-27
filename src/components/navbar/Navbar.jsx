import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="search">
                    <input className="inputForm" type="text" placeholder="Search..." />
                    <SearchIcon/>
                </div>
                <div className="items">
                   
                    <div className="item">
                        <ChatBubbleOutlineIcon className="icon"/>
                        <div className="counter">0</div>
                    </div>
                    <div className="item">
                        <NotificationsIcon className="icon"/>
                        <div className="counter">0</div>
                    </div>
                    <div className="item">
                        <FormatListBulletedIcon className="icon"/>

                    </div>
                    <div className="item">
                        <img src="https://pre00.deviantart.net/7134/th/pre/f/2014/012/f/e/fed21afd861483109ad0246f98406068-d71vny0.png" alt="" className="Avatar" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar