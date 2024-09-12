import React, { createContext, useEffect, useState } from 'react'
export const CoinContext = createContext()
export default function CoinContextProvider({children}) {
    const [allCoins, setAllCoins] = useState([])
    const [currency, setCurrency] = useState({
        name:'usd',
        Symbol:'$'
    })

    async function getAllCoins(){
        const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-v8z4K6KmnpqUJg1WSzyFc97G'}
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
        .then(response => response.json())
        .then(response => setAllCoins(response))
        .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllCoins()
    }, [currency])
    
return (
    <CoinContext.Provider value={{allCoins,currency,setCurrency}}>
        {children}
    </CoinContext.Provider>
)
}
