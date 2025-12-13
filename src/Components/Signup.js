import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Createuser } from '../Redux/Food/Security'
import {useNavigate } from 'react-router-dom'
import { showToast } from '../showToast'
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const dispatch=useDispatch()
  const [name,setname]=useState()
  const [passsword,setpass]=useState()
  const [conpasssword,setconpasssword]=useState()
  const [mail,setmail]=useState()
  // const User= useSelector(state => state.user.userItems)
  const navigate=useNavigate()

const SignupFun=async(e)=>{
  e.preventDefault() 
   await dispatch(Createuser({
    name:name , 
    email: mail  , 
    password: passsword,
    confirmPassword: conpasssword,

  }))
  // if (User?.User){
     
      showToast(true)
  
      setTimeout(() => {
        navigate('/login')
      }, 2000);
  
    // }
     
}
  return (
    <div  style={{textAlign:'left'}} className='row  vh-100 d-flex align-items-center justify-content-center'>
      <ToastContainer/>
        <div className='col-12 col-sm-12 col-md-12 col-lg-6'> 
        <img className=' vh-100' style={{width:'100%'}} src='https://raw.githubusercontent.com/rishavchanda/FoodDelivery-MERN/refs/heads/main/client/src/utils/Images/AuthImage.jpg' />

        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
            <form className='mx-5'>
        <div className="mb-3">
        <label for="name" className="form-label">user name</label>
  <input onChange={(value)=>{setname(value.target.value)}} type="text" className="form-control" id="name" placeholder="name@example.com"/>
</div>
        <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">Email address</label>
  <input onChange={(value)=>{setmail(value.target.value)}} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
        <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">password address</label>
  <input onChange={(value)=>{setpass(value.target.value)}} type="password" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div className="mb-3">
  <label for="pass" className="form-label">confirm password</label>
  <input  onChange={(value)=>{setconpasssword(value.target.value)}}  type="password" className="form-control" id="pass" placeholder="name@example.com"/>
</div>  
<p> haven't an account? <a href='/login'>click here</a> </p>
<div style={{textAlign:'center'}}>
<button onClick={SignupFun} type='submit' className="btn btn-primary mb-3">submit</button>  

</div>
            </form>

        </div>
      
    </div>
  )
}

export default Signup
