import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import TopBar from './TopBar'
import SideBar from './components/SideBar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='wrapper'>
      <SideBar />
      <rightSideBar />
      <TopBar />
      <App />
      
    </div>
  </React.StrictMode>
)
