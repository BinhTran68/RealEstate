import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '~/animate.css'
import App from "~/App"
import { BrowserRouter } from 'react-router-dom'
import "~/translation"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
