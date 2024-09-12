import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../Context/CoinContext'
import { Link } from 'react-router-dom'
export default function Navbar() {
    const {setCurrency} = useContext(CoinContext)
    function handelCurrency(e){
        switch(e.target.value){
            case "usd" :{
                setCurrency({name:"usd",Symbol:"$"})
                break;
            }
            case"eur":{
                setCurrency({name:"eur",Symbol:"€"})
                break;
            }
            default :{setCurrency({name:"usd",Symbol:"$"}) 
            break;
            }
        }
    }   
return (
    <>
    <nav className='navbar'>
        <Link to={'/'}>
            <img src={logo} alt="logo" className='logo'/>
        </Link>
        <ul>
            <Link to={'/'}>
                <li>Home</li>
            </Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className='nav-right'>
            <select onChange={(e)=>handelCurrency(e)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
            </select>
            <button >Sign Up <img src={arrow_icon} alt="arrow icon" className='icon'/></button>
        </div>
    </nav>
    </>
)
}
