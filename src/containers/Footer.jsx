import React from 'react'
import {Logo} from "../assets";
import { Link } from 'react-router-dom'; // Import the Link component from React Router

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between border-t
     border-blue-300">
        <div className="flex items-center justify-center gap-3 py-3 ">
        <img src={Logo} className="w-12 h-auto object-contain" alt=""/>
        <p>Expressume</p>
        </div>
       

<div className="flex items-center justify-center gap-6">
    <Link to="/" className="text-blue-700 text-sm">
        Home
    </Link>
    <Link to="/contact" className="text-blue-700 text-sm">
        Contact
    </Link>
    <Link to="/privacy-policy" className="text-blue-700 text-sm whitespace-nowrap">
        Privacy Policy
    </Link>
</div>

     </div>
  )
}

export default Footer