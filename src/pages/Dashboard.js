import React, { useEffect } from 'react'
import Sawo from 'sawo'
import '../Campaign.css'
import CampaignList from './CampaignList'
import CampForm from './CampForm'

const Dashboard = (props) => {
  return (
    <div className="appContainer">
      <h1 align="center">Welcome!</h1>
      <CampForm className="campForm" />
      <CampaignList className="campaignList" />
    </div>
  )
}

export default Dashboard
