import React from 'react'
import propTypes from 'prop-types'

function countRSSDetector(proposals) {
  const obz = {
    fp: 0,
    fpp: 0,
    im: 0,
    mosp: 0,
    mos: 0,
    pi: 0,
    sp: 0,
    spec: 0,
  };
  (proposals|| []).forEach(p => {
    p.instruments.rss.forEach( m => {
      if (m.mode === 'Fabry Perot') {obz.fp += 1}
      if (m.mode === 'FP polarimetry') {obz.fpp += 1}
      if (m.mode === 'Imaging') {obz.im += 1}
      if (m.mode === 'MOS') {obz.mos += 1}
      if (m.mode === 'MOS polarimetry') {obz.mosp += 1}
      if (m.mode === 'Polarimetric imaging') {obz.pi += 1}
      if (m.mode === 'Spectropolarimetry') {obz.sp += 1}
      if (m.mode === 'Spectroscopy') {obz.spec += 1}
    })
  })
  return obz
}

const RSSObservingModeTable = ({proposals}) => {
  const observingMode =countRSSDetector(proposals)
  return(
    <div className='stat-item' style={ {textAlign: 'center'} }>
      <h2>RSS Observing Mode</h2>
      <table className='stat-table'>

        {/* RSS Observing mode */}
        <thead>
          <tr>
            <th>Observing mode</th>
            <th>Number of configurations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fabry Perot</td>
            <td>{ observingMode.fp }</td>
          </tr>
          <tr>
            <td>FP polarimetry</td>
            <td>{ observingMode.fpp }</td>
          </tr>

          <tr>
            <td>MOS</td>
            <td>{ observingMode.mos }</td>
          </tr>
          <tr>
            <td>MOS polarimetry</td>
            <td>{ observingMode.mosp }</td>
          </tr>
          <tr>
            <td>Polarimetric imaging</td>
            <td>{ observingMode.pi }</td>
          </tr>
          <tr>
            <td>Imaging</td>
            <td>{ observingMode.im }</td>
          </tr>
          <tr>
            <td>Spectropolarimetry</td>
            <td>{ observingMode.sp }</td>
          </tr>
          <tr>
            <td>Spectroscopy</td>
            <td>{ observingMode.spec }</td>
          </tr>
        </tbody>

      </table>
    </div>
  )
}

RSSObservingModeTable.propTypes = {
  proposals: propTypes.array.isRequired,
}

export default RSSObservingModeTable
