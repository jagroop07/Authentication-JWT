import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  let [username,setuser] = useState()
  let [password,setpass] = useState()

  function onuserchange(e){
    return setuser(e.target.value)
  }

  function onpasschange(e){
    return setpass(e.target.value)
  }

  async function onsubmit(e){
    e.preventDefault()
    try {
      let response = await axios.post('http://localhost:8080/user/login',{username,password})
      const token = await response.data.secret_token
      if(token){
        localStorage.setItem('token', token)
        navigate('/')
      }
      console.log(response.data.message)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center' style={{backgroundColor: " #8AAAE5", height: "100dvh"}}>
        <div className="login border border-1 border-black p-4 rounded-5" style={{height: "50dvh",backgroundColor: " #FFFFFF"}}>
            <h2 className='text-center mb-4'>Login</h2>
            <form onSubmit={onsubmit} encType='multipart/form-data' method="post" className='d-flex flex-column align-items-center'>
                <div className="detail">
                    <div className="name mt-3">
                        <label className='col-4' htmlFor="username">Username:</label>
                        <input className='col-8' onChange={onuserchange} placeholder='enter username' type="text" />
                    </div> 
                    <div className="email mt-4">
                        <label className='col-4' htmlFor="email">Password:</label>
                        <input className='col-8' onChange={onpasschange} placeholder='enter password' type="password" />
                    </div>
                </div> 
                <button className='btn btn-primary mt-5 px-3' type='submit'>Submit</button>
            </form>
        </div>     
    </div>
  )
}

export default Login
