import React from 'react'
import propTypes from 'prop-types'
import {ALL_PARTNER} from '../../../types'

function add(a, b) {
  return a + b
}

function setSeeing(proposals, partner) {
  const maxSeeing =  {
    less15: {
      timeRequests: 0,
      noOfProposals: 0,
			
    },
    less20: {
      timeRequests: 0,
      noOfProposals: 0,
			
    },
    less25: {
      timeRequests: 0,
      noOfProposals: 0,
			
    },
    less30: {
      timeRequests: 0,
      noOfProposals: 0,
			
    },
    great30: {
      timeRequests: 0,
      noOfProposals: 0,

    },
		
  }
	
  proposals.forEach(p => {
    const reqTime = partner === ALL_PARTNER ? (Object.values(p.requestedTime.requests)||[]).reduce(add, 0) : p.requestedTime.requests[ partner ] || 0
		
    // seeing
    if (p.maxSeeing <= 1.5){
      maxSeeing.less15.noOfProposals += 1
      maxSeeing.less15.timeRequests += reqTime
    }
    if (p.maxSeeing > 1.5 && p.maxSeeing <= 2){
			
      maxSeeing.less20.noOfProposals += 1
      maxSeeing.less20.timeRequests += reqTime
    }
    if (p.maxSeeing > 2 && p.maxSeeing <= 2.5){
      maxSeeing.less25.noOfProposals += 1
      maxSeeing.less25.timeRequests += reqTime
    }
    if (p.maxSeeing > 2.5 && p.maxSeeing <= 3.0){
      maxSeeing.less30.noOfProposals += 1
      maxSeeing.less30.timeRequests += reqTime
    }

    if (p.maxSeeing > 3.0){
      maxSeeing.great30.noOfProposals += 1
      maxSeeing.great30.timeRequests += reqTime
    }
  })
	
  return maxSeeing
}

const ObservingStatisticsSeeing = ({proposals, partner}) => {
  const maxSeeing = setSeeing(proposals, partner)
  const totalReqTime = (maxSeeing.less15.timeRequests/3600) + (maxSeeing.less20.timeRequests/3600) +
    (maxSeeing.less25.timeRequests/3600) + (maxSeeing.less30.timeRequests/3600) + (maxSeeing.great30.timeRequests/3600)
	
  return(
    <div className='stat-item'  style={ {textAlign: 'left', width: '100%'} }>
      <table className='stat-table'  style={ {height: '100%'} }>
        <thead>
          <tr>
            <th className='width-150'>Conditions</th>
            <th>Time requested (hrs)</th>
            <th>Number of Proposals</th>
            <th>Fraction of Total Request (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max Seeing <br /> &#x2266; 1.5 </td>
            <td>{ (maxSeeing.less15.timeRequests/3600).toFixed(2) }</td>
            <td>{ maxSeeing.less15.noOfProposals }</td>
            <td>{ (((maxSeeing.less15.timeRequests/3600)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 2.0</td>
            <td>{ (maxSeeing.less20.timeRequests/3600).toFixed(2) }</td>
            <td>{ maxSeeing.less20.noOfProposals }</td>
            <td>{ (((maxSeeing.less20.timeRequests/3600)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 2.0</td>
            <td>{ (maxSeeing.less25.timeRequests/3600).toFixed(2) }</td>
            <td>{ maxSeeing.less25.noOfProposals }</td>
            <td>{ (((maxSeeing.less25.timeRequests/3600)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2266; 3.0</td>
            <td>{ (maxSeeing.less30.timeRequests/3600).toFixed(2) }</td>
            <td>{ maxSeeing.less30.noOfProposals }</td>
            <td>{ (((maxSeeing.less30.timeRequests/3600)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
          <tr>
            <td>Max Seeing <br /> &#x2267; 3.0</td>
            <td>{ (maxSeeing.great30.timeRequests/3600).toFixed(2) }</td>
            <td>{ maxSeeing.great30.noOfProposals }</td>
            <td>{ (((maxSeeing.great30.timeRequests/3600)/totalReqTime)*100).toFixed(1) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ObservingStatisticsSeeing.propTypes = {
  proposals: propTypes.array.isRequired,
  partner: propTypes.string.isRequired,
}

export default ObservingStatisticsSeeing