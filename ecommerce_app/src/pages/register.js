import React, { useState } from 'react'
import Layout from '../components/layouts/Layout'
import Toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "../style/auth.css"

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const navigate = useNavigate()

  const handleSubmit =  async(e) => {
    e.preventDefault();
    console.log(name,email,password,phone,address);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address})
      if(res && res.data.success){
        Toast.success( res.data && res.data.message);
        navigate("/login")
      }else{

        Toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      Toast.error('Something went wrong')
    }
    Toast.success('Registeration successfull')
  }

  return (
   <Layout title={'Register - Ecommerce app'}>
       <div className='form-container'>
          <h1 className='title'>Register page</h1>
          <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="form-control" id="exampleInputPassword1" required />
  </div>
  <div className="mb-3">
    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' className="form-control" id="exampleInputPassword1" required />
  </div>
  <div className="mb-3">
    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' className="form-control" id="exampleInputPassword1" required />
  </div>
  <button type="submit" className="btn btn-primary">Register</button>
</form>

       </div>
   </Layout>
  )
}

export default Register