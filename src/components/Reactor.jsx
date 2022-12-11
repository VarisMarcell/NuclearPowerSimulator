import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import LineChart from "./LineChart.jsx"
import Button from '@mui/material/Button'


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
                    <>
                        <p>{ reactor.name }</p>
                        <div style={{ maxWidth: "400px" }}>
                            <LineChart data={avgTemps} maxLength={300}
                                title={`Average Reactor Temperature (°${reactor?.temperature.unit.slice(0, 1).toUpperCase()})`}
                                xAxisLabel="Time(s)"
                                yAxisLabel={`Temperature (°${reactor?.temperature.unit.slice(0, 1).toUpperCase()})`} />
                        </div>
                        <div className="reactorCard">
                            <div className="reactorCardName">
                            </div>
                            <div className="reactorCardData">
                                <div className="reactorDataLeft">Left</div>
                                <div className="reactorDataRight">Right</div>
                            </div>
                            <div className="reactorCardShutdown">Shutdown</div>

                            <h2>Temperature</h2>
                            <p>{reactor.temperature.amount.toFixed(2)}</p>
                            <p>{reactor.temperature.unit}</p>
                            <p>{reactor.temperature.status}</p>
                            <h2>Coolant</h2>
                            <p>{reactor.coolant}</p>
                            <h2>Output</h2>
                            <p>{reactor.output.amount}</p>
                            <p>{reactor.output.unit}</p>
                            <h2>Fuel</h2>
                            <p>{reactor.fuel.percentage.toFixed(2)}%</p>
                            <h2>State</h2>
                            <p>{reactor.state}</p>
                            <h2>Control Rods</h2>
                            <h3>In</h3>
                            <p>{reactor.control_rods.in}</p>
                            <h3>Out</h3>
                            <p>{reactor.control_rods.out}</p>
                        </div>

                        <Button className="resetButton"
                variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '50px',
                    color: '#E0FF4F',
                    width: '200px',
                    height: '56px',
                    fontFamily: 'Roboto Condensed',
                    fontWeight: 700,
                    fontSize: '42px',
                    border: 3,
                    borderColor: '#FF6663',
                    borderRadius: '15px',
                }}

            >RESET</Button>

<Button variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '30px',
                    fontFamily: 'Roboto Condensed',
                    height: '68px',
                    width: '152px',
                    borderRadius: '15px',
                    fontWeight: 700,
                    fontSize: '18.5px',
                    lineHeight: '28px',
                    color: '#BFD7EA',

                }}
    
            >Coolant On</Button>

            <Button variant="contained"
                sx={{
                    bgcolor: '#0B3954',
                    marginTop: '30px',
                    fontFamily: 'Roboto Condensed',
                    height: '68px',
                    width: '152px',
                    borderRadius: '15px',
                    fontWeight: 700,
                    fontSize: '18.5px',
                    lineHeight: '28px',
                    textAlign: 'center',
                    color: '#BFD7EA',

                }}

            >Coolant Off</Button>


                        
                    </>
                ) : (
                    <p>Loading...</p>
                )
            }

        </>
    )
}


export default Reactor