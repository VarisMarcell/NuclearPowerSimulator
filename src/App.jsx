import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Reactor from './components/Reactor'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/:id", 
        element: <Reactor />
    }
]) 

function App() {
<<<<<<< HEAD
=======
    const [data, setData] = useState({ reactors: [], plant_name: "" })
>>>>>>> d7349d8 (Worked on styling the main page css)

    const apiKey = "eb800069a59bb6c8" // My (Sam's) API Key

    return (
        <RouterProvider router={router} />
    )
}

export default App
