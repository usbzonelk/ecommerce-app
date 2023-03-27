function Validation(values){
    let error = {}
    const pss_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if(values.name === ""){
        error.name = "Name should not be empty"
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }

    if(!pss_pattern.test(values.password)){
        error.password = "enter a valid password"
    }
    
    return error;


}

export default Validation;