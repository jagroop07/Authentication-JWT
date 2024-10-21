import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
    let [username,setname] = useState('')
    let [password,setemail] = useState('')
    let [avatar,setfilee] = useState()
    
    function onusernamechange(e){
       setname(e.target.value)
    }

    function onemailchange(e){
       setemail(e.target.value)
    }

    function onfilechange(e){
       setfilee(e.target.files[0])
    }

    async function onsubmit(e){
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append("username",username)
            formdata.append("password",password)
            formdata.append("avatar",avatar)
            const response = await axios.post('http://localhost:8080/user/signup',formdata)
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center' style={{backgroundColor: " #8AAAE5", height: "100dvh"}}>
        <div className="signup border border-1 border-black p-4 rounded-5" style={{height: "60dvh",backgroundColor: " #FFFFFF"}}>
            <h2 className='text-center mb-4'>Signup</h2>
            <form onSubmit={onsubmit} encType='multipart/form-data' method="post" className='d-flex flex-column align-items-center'>
                <div className="detail">
                    <div className="name mt-4">
                        <label className='col-4' htmlFor="username">Username:</label>
                        <input onChange={onusernamechange} className='col-8' placeholder='enter username' type="text" />
                    </div> 
                    <div className="email mt-4">
                        <label className='col-4' htmlFor="email">Password:</label>
                        <input onChange={onemailchange} className='col-8' placeholder='enter password' type="password" />
                    </div>
                    <div className="file mt-4">
                        <label className='col-4' htmlFor="file">Avatar:</label>
                        <input onChange={onfilechange} className='col-8' type="file" />
                    </div>
                </div> 
                <button className='btn btn-primary mt-5 px-3' type='submit'>Submit</button>
            </form>
        </div>     
    </div>
  )
}

export default Signup
