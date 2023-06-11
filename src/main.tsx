import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    
     {/* <h1 className='text-blue-500' >HI</h1> */}
    </BrowserRouter>
    
  </React.StrictMode>,
)
