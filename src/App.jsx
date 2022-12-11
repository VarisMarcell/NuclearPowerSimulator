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
    return (
        <RouterProvider router={router} />

    )
}

export default App
