import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./single.scss"


const Single = () => {
    return (
        <div className="single">
            <Sidebar/>
            <div className="singleContainer">
                <Navbar/>
                <div className="top">
                    
                        <div className="editButton">Edit</div>

                        <div className="item">
                        <div className="title">Information</div>
                        </div>

                        <div className="item">
                            <img src="https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg"alt="" className="itemImg" />
                        </div>

                        <div className="item">
                            <div className="details">
                            <h1 className="itemTitle">Helan</h1>
                            <div className="detailItem">
                                <span className="itemKey">Email: </span>
                                <span className="itemValue">Helan@gamil.com</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Phone: </span>
                                <span className="itemValue">+94 11 345 2345</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Address: </span>
                                <span className="itemValue">2/B, Country Road, Mahawatta</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Country: </span>
                                <span className="itemValue">Sri Lanka</span>
                            </div>
                            </div>
                        </div>
                        
                </div>
                    
                </div>
               
            </div>
       
    
        )
}

export default Single