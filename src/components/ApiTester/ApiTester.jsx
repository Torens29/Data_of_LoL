import { getListChampionMasteries, getPUUID } from "../../services/riotApi"

import {useEffect, useState } from "react"

export function ApiTester(){
    const [puuid, setPuuid] = useState(null)

    
    useEffect( () => {
        
        const fetchData = async () =>{
            try{
                const data = await getPUUID()
                setPuuid(data)
                const infoChamp = await getListChampionMasteries(data)
                console.log(infoChamp);
            }catch(error){
                console.error(error)
            }
        }
        fetchData()
    }, [])

    
    return (
        <div className="api-tester">
            <h1>Riot API</h1>
            <div>Your puuid: </div>
            
        </div>
    )
}