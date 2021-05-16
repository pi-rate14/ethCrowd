import React, { useState, useEffect } from 'react'
import Sawo from 'sawo'
import Dashboard from './Dashboard'
import '../App.css'
import Ethereum1 from '../assets/ethereum1.svg'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const Login = () => {
  return (
    <div className="loginContainer">
      <img src={Ethereum1} height="600px" style={{ marginTop: '40px' }} />
      <div className="sideLogin">
        <Typography variant="h2" align="center">
          ethCrowd
        </Typography>
        <Typography variant="h6" align="center">
          Start your crowdfunded campaign today!
        </Typography>
        <div
          id="sawo-container"
          style={{ height: '300px', width: '300px' }}
        ></div>
      </div>
    </div>
  )
}

export default Login
