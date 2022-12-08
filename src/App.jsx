import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [data, setData] = useState({reactors: [], plant_name: ""})

    const apiKey = "eb800069a59bb6c8" // My (Sam's) API Key

    const fetchData = async () => {
        const rawData = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`)
        const jsonData = await rawData.json()
        setData(jsonData)
    }

    const changeReactorName = async (name) => {
        const newData = await fetch(`https://nuclear.dacoder.io/reactors?apiKey=${apiKey}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({ reactorName: name })
        })
        const jsonData = await newData.json()
        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="App">
            <div className="reactorNames">
                { data.reactors.length > 0 && 
                data.reactors.map((reactor) => {
                return <p>{ reactor.name }</p>
                })}
            </div>
            <div className="logs">
                Console
            </div>

        </div>
    )
}

export default App
