import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import "./home.scss"
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widgets/Widgets'

const Home = () => {
    return (
        <div className="home">
           <Sidebar/>
           <div className="homeContainer">
            <Navbar/>
            <div className="widgets">
                <Widget type="user"/>
                <Widget type="order"/>
              


            </div>
            <div className="widgets">
                
                <Widget type="earnings"/>
                <Widget type="balance"/> 


            </div>
            </div>
        </div>
    
        )
}

export default Home