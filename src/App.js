import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Sawo from 'sawo'
import Login from './pages/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Ethereum1 from '../src/assets/ethereum1.svg'

function App() {
  const [payloadValue, setPayloadValue] = useState(false)
  useEffect(() => {
    var config = {
      containerID: 'sawo-container',
      identifierType: 'email',
      apiKey: process.env.REACT_APP_SAWO_LABS_KEY,
      onSuccess: (payload) => {
        setPayloadValue(payload)
        console.log(payload)
      },
    }
    let sawo = new Sawo(config)
    sawo.showForm()
  }, [])
  return (
    <div>
      {!payloadValue && (
        <>
          <Login className={payloadValue ? 'hidden' : ''} />
        </>
      )}
      {payloadValue && (
        <>
          <Dashboard payload={payloadValue} />
        </>
      )}
    </div>
  )
}

export default App
