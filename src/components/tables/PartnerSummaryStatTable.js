import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import PartnerSummaryStatTableRow1 from './tablesComponents/PartnerSummaryStatTableRow1'

class PartnerSummaryStatTable extends React.Component {
  render () {
    const { partner, totalObservation, completion } = this.props

    return (
      <div className='SATableDiv'>
        <h2>Summary Statistics for {partner === 'All' ? 'All Partners' : partner}</h2>
        <table className='SATable' align='center'>
          <thead>
          <tr>
            <th>Partner</th>
            <th colSpan={ 4 }>Allocated Time</th>
            <th colSpan={ 4 }>Observed Time</th>
            <th colSpan={ 4 }>Percent Completed</th>
            <th>Allocated</th>
            <th>Observed</th>
          </tr>
          <tr>
            <th />
            <th>P0+P1</th>
            <th>P2</th>
            <th>P3</th>
            <th>Total</th>
            <th>P0+P1</th>
            <th>P2</th>
            <th>P3</th>
            <th>Total</th>
            <th>P0+P1</th>
            <th>P2</th>
            <th>P3</th>
            <th>Total</th>
            <th>Shares</th>
            <th>Shares</th>
          </tr>
          </thead>
          <tbody>
          {
            completion.map((c) => (
              <PartnerSummaryStatTableRow1
                key={ c.partner }
                totalObservation={ totalObservation }
                partnerSummaryStat={
                  c
                }
              />
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }
}

PartnerSummaryStatTable.propTypes = {
  partner: propTypes.string.isRequired,
  completion: propTypes.array.isRequired,
  totalObservation: propTypes.number.isRequired
}

export default PartnerSummaryStatTable
