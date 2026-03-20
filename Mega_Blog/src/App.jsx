import './App.css'
import  {Header,Footer} from './components'
import {useDispatch} from 'react-redux'
import React,{useState,useEffect } from 'react'
import authService from "./appwrite/auth"
import {login, logout} from "./Store/authSlice"

function App() {
  const [loading, setLoading]=useState()
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout)
      }
    })
    .finally(()=>setLoading(false))
  },[])
  return (
    <h1>AKASH 
    </h1>
  )
}

export default App;
