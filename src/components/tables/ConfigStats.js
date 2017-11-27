import React from "react";
import propTypes from "prop-types";

function setProposalConfigurations(proposals){
  const data={
    rss: {
      count: 0
    },
    hrs: {
      count: 0
    },
    scam: {
      count: 0
    },
    bvit: {
      count: 0
    },

  }
  proposals.map(p => {
    if (p.instruments.rss.length !== 0){
      data.rss.count += 1
    }
    if (p.instruments.hrs.length !== 0){
      data.hrs.count += 1
    }
    if (p.instruments.scam.length !== 0){
      data.scam.count += 1
    }
    if (p.instruments.bvit.length !== 0){
      data.bvit.count += 1
    }
    return p
  })
  return data
}


const ConfigStats = (proposals) => {
  const data = setProposalConfigurations(proposals.proposals)
  return (
  <div>
    <h1>Configuration Statistics</h1>
    <table className="table center-table">
      <thead>
        <tr>
          <th><h2>Insturuments</h2></th>
          <th><h2>Number of Proposals</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h2>RSS</h2></td>
          <td><h2>{ data.rss.count }</h2></td>
        </tr>
        <tr>
          <td><h2>SALTICAM</h2></td>
          <td><h2>{ data.scam.count }</h2></td>
        </tr>
        <tr>
          <td><h2>HRS</h2></td>
          <td><h2>{ data.hrs.count }</h2></td>
        </tr>
        <tr>
          <td><h2>BVIT</h2></td>
          <td><h2>{ data.bvit.count }</h2></td>
        </tr>
      </tbody>
    </table>
  </div>
  )}

  ConfigStats.propTypes = {
    proposals: propTypes.array.isRequired
  }

export default ConfigStats;
