import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protect = (props) => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate('/login')
        }
    })
    
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Protect
