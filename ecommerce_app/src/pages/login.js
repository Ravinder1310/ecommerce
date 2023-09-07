import React, { useState } from 'react'
import Layout from '../components/layouts/Layout'
import toast from 'react-hot-toast';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom"
import "../style/auth.css"
import { useAuth } from '../context/auth';

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const location = useLocation();

  const handleSubmit =  async(e) => {
    e.preventDefault();
    console.log(email,password);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
      if(res && res.data.success){
        toast.success( res.data && res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data))
        navigate(location.state || "/")
      }else{

        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
    toast.success('Registeration successfull')
  }

  return (
    <Layout title={'Login - Ecommerce app'}>
       <div className='form-container'>
          <h1 className='title'>Login page</h1>
          <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="form-control" id="exampleInputPassword1" required />
  </div>
  <div className='mb-3'>
  <button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>Forgot Password</button>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>

       </div>
   </Layout>
  )
}

export default Login