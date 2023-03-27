export const userColumns = [
    {field: "id", headerName:"ID" , width: 70},{
        field:"user", headerName:"User", width:230, renderCell: (params)=>{
            return(
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar"/>
                    {params.row.username}
                </div>
            )
            
        }
    },
    {
        field: "email", headerName: "Email", width: 230
    },
    {
        field: "age", headerName: "Age", width: 100
    },
    
]


export const userRows = [
    {
        id: 1,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 2,
        username: "Polly",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 3,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 4,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 5,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 6,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 7,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 8,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
    {
        id: 9,
        username: "hillary",
        img: "https://i.pinimg.com/originals/e0/cc/95/e0cc953fd8068a1a0bff7e260687025d.jpg",
        email: "hhex@gamil.com",
        age: 21,
    },
]





