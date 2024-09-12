import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Context/CoinContext'
import { Link } from 'react-router-dom'
export default function Home() {
    const {allCoins , currency} = useContext(CoinContext)
    const [displayCoins, setDisplayCoins] = useState([])
    const [input, setInput] = useState('')
    function handelInput(e){
        setInput(e.target.value)
        if(e.target.value === ""){
            setDisplayCoins(allCoins)
        }
    }
    async function handelSearch(e){
        e.preventDefault()
        const coins = await allCoins.filter((item)=>item.name.toLowerCase().includes(input.toLowerCase()))
        setDisplayCoins(coins)
    }
    useEffect(() => {
        setDisplayCoins(allCoins)
    }, [allCoins])
    
return (
    <>
    <div className='home'>
        <div className='hero'>
            <h1>Largest <br/> Crypto Marketplace</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace. Sign Up to explore more about cryptos.</p>
            <form onSubmit={(e)=>handelSearch(e)}>
                <input list='coinList' onChange={(e)=>handelInput(e)} value={input} type="text" placeholder='Search Crypto...'  required/>
                <datalist id="coinList">
                    {allCoins.map((item)=><option key={item.id} value={item.name}/>)}
                </datalist>
                <button type='submit'>Search</button>
            </form>
        </div>
        <div className='crypto-table'>
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:'center'}}>24H Change</p>
                <p className='market-cap' style={{textAlign:"right"}} >Market Cap</p>
            </div>
            {displayCoins.slice(0,10).map((item)=>
            <Link key={item.id} to={`/coin/${item.id}`}>
                <div  className='table-layout'>
                <p>{item.market_cap_rank}</p>
                <div>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name + " - " + item.symbol}</p>
                </div>
                <p>{currency.Symbol} {item.current_price.toLocaleString()}</p>
                <p className={`${item.price_change_percentage_24h>0?"green":"red"}`} style={{textAlign:'center'}}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                <p className='market-cap' style={{textAlign:"right"}}>{currency.Symbol} {item.market_cap.toLocaleString()}</p>
            </div>
            </Link>
            )}
        </div>
    </div>
    </>
)
}
