import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import {productColumns, productRows} from "../../datatablesource2.js";
import {Link} from "react-router-dom";
import {useState} from "react"

const Datatable2 = () => {
    const [data, setData] = useState(productRows);

    const handleDelete = (id) =>{
        setData(data.filter((item)=>item.id !==id))
    }

    const actionColumn = [{field:"action", headerName: "Action", width: 200, renderCell:(params)=>{
        return(
            <div className="cellAction">
                <Link to="/products/test" style={{textDecoration:"none"}}>
                <div className="viewButton">View</div></Link>
                <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>Delete</div>
            </div>
        )
    }}]


    return(
        <div className="datatable">
            <div className="dataTableTitle">
                Add New Product
                <Link to="/products/new" style={{textDecoration:"none"}} className="link">
                Add New 
                </Link>
            </div>
             <DataGrid
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
        </div>
    )
}

export default Datatable2