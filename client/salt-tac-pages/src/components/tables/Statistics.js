import React from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import Link from "./Link";
import { queryData } from "../../actions/auth";

const query = `
  {
    ProposalId
    proposals(semester:"2017-2"){
      proposalcode{
        ProposalCode
      }
    }
  }`;

class Statistics extends React.Component {

  submit = () =>
    this.props.queryData(query)
      .then( () => this.props.history.push("/statistics"));


  render() {
    const toRender = this.submit

    return(
      <div>
        <h1> this are  </h1>{console.log("to render: ", toRender)}
        {toRender.map(link => (
          <Link key={link.id} link={link}/>
        ))}
      </div>
      );
    }
  }

  Statistics.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    queryData: PropTypes.func.isRequired
  };

export default connect(null, { queryData })(Statistics);
