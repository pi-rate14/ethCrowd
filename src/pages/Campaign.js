import React, { useState } from 'react'
import firebase from '../util/firebase'
import { ethers } from 'ethers'
import clsx from 'clsx'
import {
  makeStyles,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Chip,
  Button,
  Divider,
  TextField,
  LinearProgress,
  Box,
} from '@material-ui/core'
//import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
import Token from '../artifacts/contracts/Token.sol/Token.json'

//const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

const Campaign = ({ campaign }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(30),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(20),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }))

  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const [amount, setAmount] = useState(0)

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  const reduceNeed = () => {
    const reduced = campaign.need - amount
    const campaignRef = firebase.database().ref('campaign').child(campaign.id)
    campaignRef.update({
      need: reduced,
    })
  }

  const increasePercent = () => {
    const percentIncrease = (amount / campaign.totalNeed) * 100
    console.log(percentIncrease)
    const percent = campaign.percentage + percentIncrease
    console.log(percent)
    const campaignRef = firebase.database().ref('campaign').child(campaign.id)
    campaignRef.update({
      percentage: percent,
    })
  }

  async function sendCoins() {
    if (!amount) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      const transaction = await contract.transfer(campaign.wallet, amount)
      await transaction.wait()
      console.log(`${amount} Coins successfully sent to ${campaign.wallet}`)
      reduceNeed()
      increasePercent()
    }
  }

  const deleteCampaign = () => {
    const campaignRef = firebase.database().ref('campaign').child(campaign.id)
    campaignRef.remove()
  }

  if (campaign.need <= 0) {
    deleteCampaign()
  }

  return (
    <div>
      {campaign.percentage != 100 ? (
        <div className={classes.root} alignItems="center">
          <br />
          <Accordion defaultExpanded>
            <AccordionSummary
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>
                  {campaign.name}
                </Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  Total CHLP needed:{campaign.totalNeed}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  {campaign.description}
                </Typography>
              </div>
              <div className={classes.column}>
                <Typography variant="caption">Funds raised</Typography>
                <LinearProgressWithLabel value={campaign.percentage} />
                {/* <h1>{campaign.percentage}</h1> */}
              </div>

              <div className={clsx(classes.column, classes.helper)}>
                <Typography variant="caption">
                  Enter the amount to pay
                  <br />
                  <br />
                  <TextField
                    autoComplete="off"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    variant="outlined"
                    id="standard-basic"
                    label="Enter Amount"
                  />
                </Typography>
              </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={sendCoins}
              >
                Pay
              </Button>
            </AccordionActions>
          </Accordion>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Campaign
