import React from 'react'
import "./widgets.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import {Link} from "react-router-dom"

const Widget = ({type}) => {

    let data;
    //temp
    const amount=10
    const diff= 20

    switch(type){
        case "user":
            data={
                title:"USERS",
                isMoney: false,
               link: (
                <Link to="/users">see all users</Link>
               ),
                icon:(
                    <PersonOutlineRoundedIcon className="icon"
                    style={{backgroundColor: "rgba(255,0,0,0.2)", color: "crimson"}}/>
                )
            };
            break;
            case "order":
            data={
                title:"ODERS",
                isMoney: false,
                link: "view all orders",
                icon:(
                    <ShoppingCartRoundedIcon className="icon"
                    style={{backgroundColor: "rgba(218,165,32,0.2)", color: "goldenrod"}}/>
                )
            };
            break;
            case "earnings":
            data={
                title:"EARNINGS",
                isMoney: true,
                link: "view net earnings",
                icon:(
                    <MonetizationOnRoundedIcon className="icon"
                    style={{backgroundColor: "rgba(0,128,0,0.2)", color: "green"}}
                    />
                ),
            };
            break;
            case "balance":
            data={
                title:"BALANCE",
                isMoney: true,
                link: "see all details",
                icon:(
                    <AccountBalanceRoundedIcon className="icon"
                    style={{backgroundColor: "rgba(128,0,128,0.2)", color: "purple"}}/>
                )
            };
            break;
            default:
                break;
    }



    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon/>
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget