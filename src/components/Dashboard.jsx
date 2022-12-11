import { useState, useEffect } from "react"

const Dashboard = () => {
    const apiKey = "eb800069a59bb6c8" // My (Sam's) API Key

    const [data, setData] = useState({
        plant_name: "",
        reactors: []
    })

    console.log(data)

    const fetchData = async () => {
        const rawData = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
        const jsonData = await rawData.json()

        jsonData.reactors = await Promise.all( jsonData.reactors.map(async reactor => {
            const rawTempData = await fetch(`https://nuclear.dacoder.io/reactors/temperature/${reactor.id}?apiKey=${apiKey}`)
            const jsonTempData = await rawTempData.json()

            const rawCoolantData = await fetch(`https://nuclear.dacoder.io/reactors/coolant/${reactor.id}?apiKey=${apiKey}`)
            const jsonCoolantData = await rawCoolantData.json()

            const rawOutputData = await fetch(`https://nuclear.dacoder.io/reactors/output/${reactor.id}?apiKey=${apiKey}`)
            const jsonOutputData = await rawOutputData.json()

            const rawFuelData = await fetch(`https://nuclear.dacoder.io/reactors/fuel-level/${reactor.id}?apiKey=${apiKey}`)
            const jsonFuelData = await rawFuelData.json()

            const rawReactorStateData = await fetch(`https://nuclear.dacoder.io/reactors/reactor-state/${reactor.id}?apiKey=${apiKey}`)
            const jsonReactorStateData = await rawReactorStateData.json()

            const rawRodStateData = await fetch(`https://nuclear.dacoder.io/reactors/rod-state/${reactor.id}?apiKey=${apiKey}`)
            const jsonRodStateData = await rawRodStateData.json()

            return {
                ...reactor, 
                temperature: jsonTempData.temperature,
                coolant: jsonCoolantData.coolant,
                output: jsonOutputData.output,
                fuel: jsonFuelData.fuel,
                state: jsonReactorStateData.state,
                control_rods: jsonRodStateData.control_rods
            }
        }))

        const rawLogsData = await fetch(`https://nuclear.dacoder.io/reactors/logs?apiKey=${apiKey}`)
        const jsonLogsData = await rawLogsData.json()
        
        setData(jsonData) 
    }

    useEffect( () => {
        const timer = setInterval(fetchData, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <p>hi</p>
    )
}

export default Dashboard