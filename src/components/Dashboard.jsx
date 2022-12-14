import { useState, useEffect } from "react"
import LineChart from "./LineChart"
import TopBar from "./TopBar"
<<<<<<< HEAD
import { Paper } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
=======
import { useNavigate } from "react-router-dom"
import SideBar from "./SideBar"
import '../App.css'

>>>>>>> adrian/reactor-changes

const Dashboard = () => {
    const apiKey = "eb800069a59bb6c8" // My (Sam's) API Key

    const [data, setData] = useState({
        plant_name: "",
        reactors: [],
        logs: [],
    })

    const [avgTemp, setAvgTemp] = useState(22.22)
    const [avgTemps, setAvgTemps] = useState([])

    const fetchData = async () => {
        const rawData = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
        const jsonData = await rawData.json()

        jsonData.reactors = await Promise.all(jsonData.reactors.map(async reactor => {
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
        const flatLogs = jsonLogsData.flatMap(obj => {
            return Object.keys(obj).flatMap(key => {
                return obj[key]
            })
        })

        jsonData.logs = flatLogs

        const averageTemp = jsonData.reactors.reduce((accumulator, reactor) => {
            return accumulator + reactor.temperature.amount
        }, 0) / jsonData.reactors.length

        setAvgTemp(averageTemp)

        setAvgTemps(prevAvgTemps => {
            return [...prevAvgTemps, averageTemp]
        })

        setData(jsonData)
    }

    useEffect(() => {
        const timer = setInterval(fetchData, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    const navigate = useNavigate()

    return (
        <>
            <div className='wrapper'>
                <TopBar name={data.plant_name} reactors={data.reactors} />
                <SideBar />
            </section>
            <div className="wrapper">
                <section className="dashboard">
                    <div className="dashboardData">
                        <div className="dashDataTop">
                            <div className="dashTempDisplay">
                                <div className="dashTempLine"></div>
                                <div className="dashTempDisplay1"></div>
                                <div className="dashTempTitle">
                                    <p>Average Temperature</p>
                                </div>
                                <div className="dashTempData">
                                    {avgTemp.toFixed(2)} {`??${data.reactors[0]?.temperature.unit.slice(0, 1).toUpperCase()}`}
                                </div>
                            </div>
                            <div className="avgTempChart">
                                <LineChart data={avgTemps} maxLength={300} title={`Average Reactor Temperature (??${data.reactors[0]?.temperature.unit.slice(0, 1).toUpperCase()})`} xAxisLabel="Time (s)" yAxisLabel={`Temperature (??${data.reactors[0]?.temperature.unit.slice(0, 1).toUpperCase()})`} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="dashboardDataBottom">

            </div>
            <div className="reactorList">
                <div className="reactorListTitleArea">
                    <div className="reactorListTitle">
                        <p>Reactors</p>
                    </div>
                    <div className="reactorListDivider"></div>
                </div>
                {
                    data.reactors.map(reactor => {
                        return (
                            <>
                                <div className="reactorCard" onClick={() => {
                                    navigate(`/${reactor.id}`)

                                }}>
                                    <div className="reactorCardName">
                                        <p>{reactor.name}</p>
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
                            </>
                        )
                    })
                }
            </div>
        </div>
        / <div>
        </section>
    )
}



// Wasnt working

export default Dashboard