import React, { useState } from 'react'
import firebase from '../util/firebase'
import { TextField, Button, Typography } from '@material-ui/core'
import '../../src/App.css'

const CampForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [wallet, setWallet] = useState('')
  const [need, setNeed] = useState('')
  const [totalNeed, setTotalNeed] = useState('')
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleDescChange = (e) => {
    setDescription(e.target.value)
  }
  const handleWalletChange = (e) => {
    setWallet(e.target.value)
  }
  const handleNeedChange = (e) => {
    setNeed(e.target.value)
    setTotalNeed(e.target.value)
  }
  const createCampaign = () => {
    const campaignRef = firebase.database().ref('campaign')
    const campaignObj = {
      name,
      description,
      wallet,
      need,
      totalNeed,
      percentage: 0,
      complete: false,
    }
    campaignRef.push(campaignObj)
    setName('')
    setDescription('')
    setWallet('')
    setNeed('')
  }
  return (
    <div className="campaignForm">
      <Typography align="center" variant="h5">
        Start your own campaign!
      </Typography>
      <TextField
        autoComplete="off"
        placeholder="name"
        onChange={handleNameChange}
        value={name}
        id="standard-basic"
        label="Name of campaign"
        variant="outlined"
      />
      <TextField
        autoComplete="off"
        placeholder="description"
        onChange={handleDescChange}
        value={description}
        id="standard-basic"
        label="Description of Campaign"
        variant="outlined"
      />
      <TextField
        autoComplete="off"
        placeholder="wallet key"
        onChange={handleWalletChange}
        value={wallet}
        id="standard-basic"
        label="CHLP Wallet Key"
        variant="outlined"
      />
      <TextField
        autoComplete="off"
        placeholder="amount needed"
        onChange={handleNeedChange}
        value={need}
        id="standard-basic"
        label="Amount Needed"
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={createCampaign}>
        Start Campaign
      </Button>
    </div>
  )
}

export default CampForm
