import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./singleProduct.scss"


const Single = () => {
    return (
        <div className="single">
            <Sidebar/>
            <div className="singleProductContainer">
                <Navbar/>
                <div className="top">
                    
                        <div className="editButton">Edit</div>

                        <div className="itemtitle">
                        <div className="title1">Information</div>
                        </div>

                        <div className="itemContainer">
                        <div className="item">
                            <img src="https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2021/07/msi-bravo-front.jpg"alt="" className="itemImg" />
                        </div>

                        <div className="item">
                            <div className="details">
                            <h1 className="itemTitle">Bravo 15</h1>
                            <div className="detailItem">
                                <span className="itemKey">ID: </span>
                                <span className="itemValue">A001</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Stock Availability: </span>
                                <span className="itemValue">2</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Price: </span>
                                <span className="itemValue">Rs. 3,50,000</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Country: </span>
                                <span className="itemValue">Thailand</span>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="detailDescription">
                                <span className="itemKey">Description: </span><hr/><br />
                                <span className="itemValue">The MSI 15.6" Bravo 15 Gaming Laptop combines both AMD's CPU and GPU advancements to bring users a formidable gaming system. Specs-wise, it's equipped with a 3.0 GHz AMD Ryzen 5 4600H six-core processor, 8GB of DDR4 RAM, a 512GB NVMe PCIe M.2 SSD, and an AMD Radeon RX 5500M graphics card.</span>
                            </div>
                        
                </div>
                    
                </div>
               
            </div>
       
    
        )
}

export default Single