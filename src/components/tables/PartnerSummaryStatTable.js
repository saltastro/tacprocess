import React from 'react'
import propTypes from 'prop-types'
import '../../styles/components/tables.css'
import { partnerSummaryStat } from '../../util/partner-stat'
import PartnerSummaryStatTableRow from './tablesComponents/PartnerSummaryStatTableRow'
import {getPartnerList} from '../../util/filters'

class PartnerSummaryStatTable extends React.Component {
  render () {
    const {user, proposals, semester, partner, partnerShareTimes, totalObservation} = this.props
    const partnerList = partner === 'All'
      ? getPartnerList(user.roles)
      : getPartnerList(user.roles).filter((p) => p === partner)
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
              partnerList.map((p) => (
                <PartnerSummaryStatTableRow
                  key={ p }
                  partner={ p }
                  partnerSummaryStat={
                    partnerSummaryStat(proposals, semester, p, partnerShareTimes, totalObservation)
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
  user: propTypes.object.isRequired,
  proposals: propTypes.array.isRequired,
  semester: propTypes.string.isRequired,
  partner: propTypes.string.isRequired,
  partnerShareTimes: propTypes.array.isRequired,
  totalObservation: propTypes.number.isRequired
}

export default PartnerSummaryStatTable
