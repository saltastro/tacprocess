import React from "react";
import propTypes from "prop-types";

import ProposalTable from "./ProposalTable";

class StatPropos extends React.Component {
  state = {};

  render() {
    const { targets, proposals} = this.props
    return(
      <div>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th><h2>Total</h2></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><h3>Proposals</h3></td>
              <td><h3>{proposals.length}</h3></td>
            </tr>
            <tr>
              <td><h3>Targets</h3></td>
              <td><h3>{targets.length}</h3></td>
            </tr>
          </tbody>
        </table>
        <ProposalTable proposals={proposals} />
      </div>
      );
    }
  }

  StatPropos.propTypes = {
    targets: propTypes.array.isRequired ,
    proposals: propTypes.array.isRequired ,
  }

export default StatPropos;
