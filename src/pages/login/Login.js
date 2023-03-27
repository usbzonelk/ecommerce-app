import './login.scss';
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (e) => {
    alert("data submitted")
  };

  return (
    <>
      <div className="container w-25 p-3 background mt-5">
        <h3 className='text-center'>Login Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row my-3">
            <div className="col-3">
              <label for="email">Username : </label>
            </div>
            <div className="col-9">
              <input type="username"{...register("username", { required: true })} placeholder="Your username.." />
              {errors.username && <p  style={{color:"red"}} className="error">Please enter username !</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <label for="password">Password : </label>
            </div>
            <div className="col-9">
              <input type="password" {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/ })} placeholder="Your password.." />
              {errors.password && <p style={{color:"red"}} className="error">Please enter valid Password !</p>}
            </div>
          </div>
          <div className='mt-3'>
            <button type='submit' className='btn btn-outline-success'>Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;