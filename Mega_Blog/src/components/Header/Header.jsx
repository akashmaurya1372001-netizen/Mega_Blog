import React from "react"
import { useNavigate } from "react-router-dom";
import {container,Logo,LogoutBtn} from  '../index'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'


function Header(){
    const authService= useSelector((state)=>satisfies.auth.status)
    const navigate=useNavigate()

    const navItems=[
        {
            name:'home'
            slug:"/",
            active:true 
        },
        {
          name:'login'
            slug:"/login",
            active:!authStatus, 
        }, 
    ]
        }
    
    return

export default Header;