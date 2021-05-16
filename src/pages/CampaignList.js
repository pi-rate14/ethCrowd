import { Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import firebase from '../util/firebase'
import Campaign from './Campaign'
const CampaignList = () => {
  const [campaignList, setCampaignList] = useState()
  //getting the running campaigns
  useEffect(() => {
    const campaignRef = firebase.database().ref('campaign')
    campaignRef.on('value', (snapshot) => {
      const campaigns = snapshot.val()
      const campaignList = []
      for (let id in campaigns) {
        campaignList.push({ id, ...campaigns[id] })
      }
      console.log(campaignList)
      setCampaignList(campaignList)
    })
  }, [])
  return (
    <div>
      <Typography align="center" variant="h5">
        Active Campaigns
      </Typography>
      {campaignList
        ? campaignList.map((campaign, index) => (
            <Campaign campaign={campaign} key={index} />
          ))
        : ''}
    </div>
  )
}

export default CampaignList
