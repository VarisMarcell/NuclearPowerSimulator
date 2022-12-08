import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [data, setData] = useState({reactors: [], plant_name: ""})

    const fetchData = async () => {
        const rawData = await fetch("https://nuclear.dacoder.io/reactors?apiKey=eb800069a59bb6c8")
        const jsonData = await rawData.json()
        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(data)

    return (
        <div className="App">
            <div className="reactorNames">
                { data.reactors.length > 0 && 
                data.reactors.map((reactor) => {
                return <p>{ reactor.name }</p>
                })}
            </div>
            
        </div>
    )
}

export default App
