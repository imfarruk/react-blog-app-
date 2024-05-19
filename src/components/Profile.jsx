import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const {isAuthenticated,loading} = useSelector(state=>state.auth)
    
    useEffect(()=>{
      !isAuthenticated && navigate('/')
    },[isAuthenticated])
  return (
    <div>Profile</div>
  )
}

export default Profile