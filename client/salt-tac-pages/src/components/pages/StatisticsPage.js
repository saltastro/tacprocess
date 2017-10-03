import React from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ConfirmUsernameMessage from "../massages/ConfirmUsernameMessage"

const StatisticsPage = ({ isConfirmed }) => (
  <div>
    {!isConfirmed && <ConfirmUsernameMessage />}
  </div>
);

StatisticsPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return{
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps)(StatisticsPage);
