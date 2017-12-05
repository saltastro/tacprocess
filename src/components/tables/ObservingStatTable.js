import React from "react";
import propTypes from "prop-types";

function setProposalTransparency(proposals) {
  const data = {
    maxSeeing: {
      less10: {
        timeRequests: 0,
        noOfProposals: 0,

      },
      less15: {
        timeRequests: 0,
        noOfProposals: 0,

      },
      less20: {
        timeRequests: 0,
        noOfProposals: 0,

      },
      less50: {
        timeRequests: 0,
        noOfProposals: 0,

      },
    },
    transparency: {
      clear: {
        timeRequests: 0,
        noOfProposals: 0,
        fraction: 0
      },
      thin: {
        timeRequests: 0,
        noOfProposals: 0,
        fraction: 0
      },
      thick: {
        timeRequests: 0,
        noOfProposals: 0,
        fraction: 0
      },
      any: {
        timeRequests: 0,
        noOfProposals: 0,
        fraction: 0
      }
    }
  }
  proposals.map(p => {
    let reqTime = p.totalRequestedTime
    if ( isNaN(reqTime)) { reqTime = 0 }
    if (p.transparency === "Clear"){
      data.transparency.clear.noOfProposals += 1
      data.transparency.clear.timeRequests += reqTime
    }
    if (p.transparency === "Any"){

      data.transparency.any.noOfProposals += 1
      data.transparency.any.timeRequests += reqTime
    }
    if (p.transparency === "Thick cloud"){
      data.transparency.thick.noOfProposals += 1
      data.transparency.thick.timeRequests += reqTime
    }
    if (p.transparency === "Thin cloud"){
      data.transparency.thin.noOfProposals += 1
      data.transparency.thin.timeRequests += reqTime
    }

    // seeing
    if (p.maxSeeing <= 1){
      data.maxSeeing.less10.noOfProposals += 1
      data.maxSeeing.less10.timeRequests += reqTime
    }
    if (p.maxSeeing > 1 && p.maxSeeing <= 1.5){

      data.maxSeeing.less15.noOfProposals += 1
      data.maxSeeing.less15.timeRequests += reqTime
    }
    if (p.maxSeeing > 1.5 && p.maxSeeing <= 2){
      data.maxSeeing.less20.noOfProposals += 1
      data.maxSeeing.less20.timeRequests += reqTime
    }
    if (p.maxSeeing > 2 && p.maxSeeing <= 5.0){
      data.maxSeeing.less50.noOfProposals += 1
      data.maxSeeing.less50.timeRequests += reqTime
    }


    return p
  })

  return data
}


const ObservingStatTable = (proposals) => {

  const data = setProposalTransparency(proposals.proposals)
  return(
  <div>
    <h1>Observing Statistics</h1>
    <table className="table center-table">
      <thead>
        <tr>
          <th><h2>Conditions</h2></th>
          <th><h2>Time requested (hrs)</h2></th>
          <th><h2>Number of Proposals</h2></th>
          <th><h2>Fraction of Total Request (%)</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h2>Clear</h2></td>
          <td><h2>{ data.transparency.clear.timeRequests }</h2></td>
          <td><h2>{ data.transparency.clear.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
        <tr>
          <td><h2>Thin cloud</h2></td>
          <td><h2>{ data.transparency.thin.timeRequests }</h2></td>
          <td><h2>{ data.transparency.thin.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
        <tr>
          <td><h2>Thick cloud</h2></td>
          <td><h2>{ data.transparency.thick.timeRequests }</h2></td>
          <td><h2>{ data.transparency.thick.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
        <tr>
          <td><h2>Any</h2></td>
          <td><h2>{ data.transparency.any.timeRequests }</h2></td>
          <td><h2>{ data.transparency.any.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h3>Max Seeing <br /> &#x2266; 1.0 </h3></td>
          <td><h2>{ data.maxSeeing.less10.timeRequests }</h2></td>
          <td><h2>{ data.maxSeeing.less10.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
        <tr>
          <td><h3>Max Seeing <br /> &#x2266; 1.5</h3></td>
          <td><h2>{ data.maxSeeing.less15.timeRequests }</h2></td>
          <td><h2>{ data.maxSeeing.less15.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
        <tr>
          <td><h3>Max Seeing <br /> &#x2266; 2.0</h3></td>
          <td><h2>{ data.maxSeeing.less20.timeRequests }</h2></td>
          <td><h2>{ data.maxSeeing.less20.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
        <tr>
          <td><h3>Max Seeing <br /> &#x2266; 5.0</h3></td>
          <td><h2>{ data.maxSeeing.less50.timeRequests }</h2></td>
          <td><h2>{ data.maxSeeing.less50.noOfProposals }</h2></td>
          <td><h2>{0}</h2></td>
        </tr>
      </tbody>
    </table>
  </div>
)}

ObservingStatTable.propTypes = {
  proposals: propTypes.array.isRequired
}

export default ObservingStatTable;
