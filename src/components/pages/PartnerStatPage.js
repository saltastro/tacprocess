import React from 'react'
import propTypes from 'prop-types'
import PartnerStatTable from '../tables/PartnerStatTable'

const PartnerStatPage = ({ filters, proposals, user }) => {
  const linkToDashboard = 'http://ft.salt.saao.ac.za/stats/dashboard'
  if (proposals.length === 0 || (Object.keys(user).length === 0 || user == null)) {
    return (
      <p style={ {textAlign: 'left'} }>
        <a target='_blank' href={ linkToDashboard }> Click here for the Weather Statistics </a>
      </p>
    )
  }
  const semester = filters.selectedSemester
  const partner = filters.selectedPartner
  return (
    <div>
      <p style={ {textAlign: 'left'} }><a target='_blank' href={ linkToDashboard }> Click here for the Weather Statistics </a></p>
      <PartnerStatTable
        proposals={ proposals }
        semester={ semester }
        partner={ partner }
        user={ user }
      />
    </div>
  )
}

PartnerStatPage.propTypes = {
  proposals: propTypes.array.isRequired,
  filters: propTypes.object.isRequired,
  user: propTypes.object.isRequired
}
export default PartnerStatPage
