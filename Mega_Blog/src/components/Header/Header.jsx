import React from "react"
import { useNavigate } from "react-router-dom";
import {container,Logo,LogoutBtn} from  '../index'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import {useSelector} from 'rect-redux'

function Header(){
    const authStatus= useSelector((state)=> state.auth.status)
    const navigate = useNavigate()

    const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

        }
    
    return

export default Header;