import React, { useEffect, useState } from 'react'
import { login } from '../Redux/Food/Security'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom'
import { showToast } from './../showToast';
import { ToastContainer, toast } from 'react-toastify';

const Login = ( ) => {

  const dispatch=useDispatch()
  const [passsword,setpass]=useState('')
  const [mail,setmail]=useState('')
  const currentUser = useSelector(state => state.user?.currentUser)
  const loading = useSelector(state => state.user?.loading)
  const error = useSelector(state => state.user?.err)
  const navigate =useNavigate()

  // تعيين القيم الافتراضية لتسهيل تسجيل الدخول
  useEffect(() => {
    setmail('osama@gmail.com')
    setpass('123456')
  }, [])

  const LoginFun=async (e)=>{
    e.preventDefault() 
    
    if (!mail || !passsword) {
      toast.error('من فضلك أدخل البريد الإلكتروني وكلمة المرور')
      return
    }
    
    try {
      const result = await dispatch(login({
        email: mail, 
        password: passsword,
      })).unwrap()
      
      if (result) {
        showToast(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (err) {
      toast.error(err.message || 'فشل تسجيل الدخول')
    }
  }

  useEffect(() => {
    document.body.classList.add('no-sidebar');
    return () => {
      document.body.classList.remove('no-sidebar');
    };
  }, [])

  // إذا كان المستخدم مسجل الدخول بالفعل، أعد توجيهه
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  return (
    <div style={{textAlign:'left'}} className=' row vh-100 d-flex align-items-center justify-content-center'>
      <ToastContainer/>
      <div className=' col-12 col-sm-12 col-md-12 col-lg-6 '>
        <img className='vh-100' style={{width:'100%' ,height:'auto' ,objectFit:'cover'}} src='https://raw.githubusercontent.com/rishavchanda/FoodDelivery-MERN/refs/heads/main/client/src/utils/Images/AuthImage.jpg' />
      </div>
      
      <div className='col-12 col-sm-12 col-md-12 col-lg-6  '>
        <form className='mx-5 ' onSubmit={LoginFun}>
          <h2 className="mb-4 text-center">تسجيل الدخول</h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
            <input 
              value={mail}
              onChange={(e)=>{setmail(e.target.value)}} 
              type="email" 
              className="form-control" 
              id="email" 
              placeholder="osama@gmail.com"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">كلمة المرور</label>
            <input 
              value={passsword}
              onChange={(e)=>{setpass(e.target.value)}} 
              type="password" 
              className="form-control" 
              id="password" 
              placeholder="123456"
              required
            />
          </div>
          
          <div className="mb-3">
            <small className="text-muted">
              <strong>بيانات تسجيل الدخول التجريبية:</strong><br/>
              البريد: osama@gmail.com<br/>
              كلمة المرور: 123456
            </small>
          </div>
          
          <p className="text-center">
            ليس لديك حساب؟ <a href='/signup'>سجل هنا</a>
          </p>
          
          <div style={{textAlign:'center'}}>
            <button 
              type='submit' 
              className="btn btn-primary mb-3" 
              disabled={loading}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login