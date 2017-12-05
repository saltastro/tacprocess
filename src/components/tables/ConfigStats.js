import React from "react";
import propTypes from "prop-types";


function isModeInProposal(value, array){
  let isIn = false;
  array.map(a => {
    if (a.dictatorMode === value){ isIn = true }
    return a
  })
  return isIn;
}

function isExModeInProposal(value, array){
  let isIn = false;
  array.map(a => {
    if (a.exposureMode === value){ isIn = true }
    return a
  })
  return isIn;
}

function isObsModeInProposal(value, array){
  let isIn = false;
  array.map(a => {
    if (a.mode === value){ isIn = true }
    return a
  })
  return isIn;
}

function setProposalConfigurations(proposals){
  const data={
    rss: {
      count: 0,
      dectactorMode:{
        dscan: 0,
        xfer: 0,
        normal: 0,
        shuffle: 0,
        slot: 0
      },
      observingMode: {
        fp: 0,
        fpp: 0,
        mos: 0,
        mosp: 0,
        sp: 0,
        spp: 0,
        im: 0,
        imp: 0,
      }

    },
    hrs: {
      count: 0,
      exposureMode: {
        hr: 0,
        hs: 0,
        icf: 0,
        lr: 0,
        mr: 0,
      }
    },
    scam: {
      count: 0,
      dectactorMode:{
        dscan: 0,
        xfer: 0,
        normal: 0,
        slot: 0
      }
    },
    bvit: {
      count: 0
    },

  }
  proposals.map(p => {
    if (p.instruments.rss.length !== 0){
      data.rss.count += 1
      /* Observing Mode */
      if(isObsModeInProposal( "Fabry Perot", p.instruments.rss )){ data.rss.observingMode.fp += 1 }
      if(isObsModeInProposal( "FP polarimetryp", p.instruments.rss )){ data.rss.observingMode.fp += 1 }
      if(isObsModeInProposal( "Imaging", p.instruments.rss )){ data.rss.observingMode.im += 1 }
      if(isObsModeInProposal( "MOS", p.instruments.rss )){ data.rss.observingMode.mos += 1 }
      if(isObsModeInProposal( "MOS polarimetry", p.instruments.rss )){ data.rss.observingMode.mosp += 1 }
      if(isObsModeInProposal( "Polarimetric imaging", p.instruments.rss )){ data.rss.observingMode.imp += 1 }
      if(isObsModeInProposal( "Spectropolarimetry", p.instruments.rss )){ data.rss.observingMode.spp += 1 }
      if(isObsModeInProposal( "Spectroscopy", p.instruments.rss )){ data.rss.observingMode.sp += 1 }


      /* Observing Mode */
      if (isModeInProposal("NORMAL", p.instruments.rss )) {
        data.rss.dectactorMode.normal += 1
      }
      if (isModeInProposal("SLOT MODE", p.instruments.rss )) {
        data.rss.dectactorMode.slot += 1
       }
      if (isModeInProposal("DRIFT SCAN", p.instruments.rss )) {
        data.rss.dectactorMode.dscan += 1
      }
      if (isModeInProposal("SHUFFLE", p.instruments.rss )) {
        data.rss.dectactorMode.shuffle += 1
      }
      if (isModeInProposal("FRAME TRANSFER", p.instruments.rss )) {
        data.rss.dectactorMode.xfer += 1
      }
    }
    if (p.instruments.hrs.length !== 0){
      data.hrs.count += 1
      if (isExModeInProposal("HIGH RESOLUTION", p.instruments.hrs )) { data.hrs.exposureMode.hr += 1 }
      if (isExModeInProposal("HIGH STABILITY", p.instruments.hrs )) { data.hrs.exposureMode.hs += 1 }
      if (isExModeInProposal("INT CAL FIBRE", p.instruments.hrs )) { data.hrs.exposureMode.icf += 1 }
      if (isExModeInProposal("LOW RESOLUTION", p.instruments.hrs )) { data.hrs.exposureMode.lr += 1 }
      if (isExModeInProposal("MEDIUM RESOLUTION", p.instruments.hrs )) { data.hrs.exposureMode.mr += 1 }
    }
    if (p.instruments.scam.length !== 0){
      data.scam.count += 1
      if (isModeInProposal("NORMAL", p.instruments.scam )) {
        data.scam.dectactorMode.normal += 1
      }
      if (isModeInProposal("SLOT", p.instruments.scam )) {
        data.scam.dectactorMode.slot += 1
       }
      if (isModeInProposal("DRIFTSCAN", p.instruments.scam )) {
        data.scam.dectactorMode.dscan += 1
      }
      if (isModeInProposal("FRAME XFER", p.instruments.scam )) {
        data.scam.dectactorMode.xfer += 1
      }
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
    {/* Salticam table */}
    <h2>Salticam</h2>
    <table className="table center-table">
      <thead>
        <tr>
          <th><h2>Detector mode</h2></th>
          <th><h2>Number of Proposals</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h2>DRIFT SCAN</h2></td>
          <td><h2>{ data.scam.dectactorMode.dscan }</h2></td>
        </tr>
        <tr>
          <td><h2>FRAME XFER</h2></td>
          <td><h2>{ data.scam.dectactorMode.xfer }</h2></td>
        </tr>
        <tr>
          <td><h2>NORMAL</h2></td>
          <td><h2>{ data.scam.dectactorMode.normal }</h2></td>
        </tr>
        <tr>
          <td><h2>SLOT</h2></td>
          <td><h2>{ data.scam.dectactorMode.slot }</h2></td>
        </tr>
      </tbody>
    </table>

    {/* RSS table */}
    <h2>RSS</h2>
    <table className="table center-table">
    {/* RSS Dictator mode */}
      <thead>
        <tr>
          <th><h2>Detector mode</h2></th>
          <th><h2>Number of Proposals</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h2>DRIFT SCAN</h2></td>
          <td><h2>{ data.rss.dectactorMode.dscan }</h2></td>
        </tr>
        <tr>
          <td><h2>FRAME TRANSFER</h2></td>
          <td><h2>{ data.rss.dectactorMode.xfer }</h2></td>
        </tr>
        <tr>
          <td><h2>NORMAL</h2></td>
          <td><h2>{ data.rss.dectactorMode.normal }</h2></td>
        </tr>
        <tr>
          <td><h2>SHUFFLE</h2></td>
          <td><h2>{ data.rss.dectactorMode.shuffle }</h2></td>
        </tr>
        <tr>
          <td><h2>SLOT MODE</h2></td>
          <td><h2>{ data.rss.dectactorMode.slot }</h2></td>
        </tr>
      </tbody>
    {/* RSS Observing mode */}
      <thead>
        <tr>
          <th><h2>Observing mode</h2></th>
          <th><h2>Number of Proposals</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h2>Fabry Perot</h2></td>
          <td><h2>{ data.rss.observingMode.fp }</h2></td>
        </tr>
        <tr>
          <td><h2>FP polarimetry</h2></td>
          <td><h2>{ data.rss.observingMode.fpp }</h2></td>
        </tr>

        <tr>
          <td><h2>MOS</h2></td>
          <td><h2>{ data.rss.observingMode.mos }</h2></td>
        </tr>
        <tr>
          <td><h2>MOS polarimetry</h2></td>
          <td><h2>{ data.rss.observingMode.mosp }</h2></td>
        </tr>
        <tr>
          <td><h2>Polarimetric imaging</h2></td>
          <td><h2>{ data.rss.observingMode.imp }</h2></td>
        </tr>
        <tr>
          <td><h2>Imaging</h2></td>
          <td><h2>{ data.rss.observingMode.im }</h2></td>
        </tr>
        <tr>
          <td><h2>Spectropolarimetry</h2></td>
          <td><h2>{ data.rss.observingMode.spp }</h2></td>
        </tr>
        <tr>
          <td><h2>Spectroscopy</h2></td>
          <td><h2>{ data.rss.observingMode.sp }</h2></td>
        </tr>
      </tbody>

    </table>

    {/* HRS */}
    <h2>HRS</h2>
    <table className="table center-table">
      <thead>
        <tr>
          <th><h2>Exposure mode</h2></th>
          <th><h2>Number of Proposals</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h2>HIGH RESOLUTION</h2></td>
          <td><h2>{ data.hrs.exposureMode.hr }</h2></td>
        </tr>
        <tr>
          <td><h2>HIGH STABILITY</h2></td>
          <td><h2>{ data.hrs.exposureMode.hs }</h2></td>
        </tr>
        <tr>
          <td><h2>INT CAL FIBRE</h2></td>
          <td><h2>{ data.hrs.exposureMode.icf }</h2></td>
        </tr>
        <tr>
          <td><h2>LOW RESOLUTION</h2></td>
          <td><h2>{ data.hrs.exposureMode.lr }</h2></td>
        </tr>
        <tr>
          <td><h2>MEDIUM RESOLUTION</h2></td>
          <td><h2>{ data.hrs.exposureMode.mr }</h2></td>
        </tr>
      </tbody>
    </table>
  </div>
  )}

  ConfigStats.propTypes = {
    proposals: propTypes.array.isRequired
  }

export default ConfigStats;
