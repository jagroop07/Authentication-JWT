import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let [user,setuser] = useState({})
  const navigate = useNavigate()
  useEffect(()=>{
    const dataa = async() => {
      const token = localStorage.getItem('token')
      if(token){
        const response = await axios.get('http://localhost:8080/user/',{
          headers: {
            'token': token
          }
        }) 

        //////////////////////////catch errorrr
        const erorrr = response.data?response.data === "jwt expired":""
        if(erorrr){
          navigate('/login')
          localStorage.removeItem('token')
        }

        /////////////////////////find user who logged in
        const profile = response.data.userr?response.data.userr.find((e) => e.username === response.data.james.username):""
        setuser(profile)
        console.log(response.data)
      }
    }
    dataa()
  },[navigate])

  function handlelogout(){
    if(localStorage.getItem('token')){
      navigate('/login')
      localStorage.removeItem('token')
    }
  }
  return (
    <div className='text-center'>
      <h1 className='text-center fw-bold'>User</h1>
      <div className='mb-4 mt-5'>
        <p className='mb-0 fw-bold'>username:</p>{user?user.username:""}
        <p className='fw-bold mt-3 mb-0'>image:</p><img className='mt-2' height={"100px"} width={"200px"} src={user?user.image:""} alt="" />
      </div>
      <button className='btn btn-primary rounded-pill' onClick={handlelogout}>log Out</button>
    </div>
  )
}

export default Home
