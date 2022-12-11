import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import LineChart from "./LineChart.jsx"


const Reactor = () => {
    const [reactor, setReactor] = useState(null)
    const [avgTemps, setAvgTemps] = useState([])
    const apiKey = "eb800069a59bb6c8" // My (Sam's) API Key
    const { id } = useParams()

    const fetchData = async () => {
        const rawData = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
        const jsonData = await rawData.json()

        const reactors = await Promise.all(jsonData.reactors.filter(reactor => reactor.id === id).map(async reactor => {
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

        setReactor(reactors[0])
        setAvgTemps(prevAvgTemps => {
            return [...prevAvgTemps, reactors[0].temperature.amount]
        })
    }

    useEffect(() => {
        const timer = setInterval(fetchData, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    console.log(reactor)

    return (
        <>
            {
                reactor ? (
                    <p>{reactor.name}</p>
                ) : (
                    <p>Loading...</p>
                )


            }

            <div style={{ maxWidth: "400px" }}>
                <LineChart data={avgTemps} maxLength={300}
                    title={`Average Reactor Temperature (°${reactor?.temperature.unit.slice(0, 1).toUpperCase()})`}
                    xAxisLabel="Time(s)"
                    yAxisLabel={`Temperature (°${reactor?.temperature.unit.slice(0, 1).toUpperCase()})`} />
            </div>
        </>
    )
}


export default Reactor