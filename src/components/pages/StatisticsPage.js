import React from "react";
import { connect } from "react-redux"
import Navigation from "../Navigation";
import { fetchStatData } from "../../actions/statisticsActions";
import StatTable from "../tables/StatTable";

class StatisticsPage extends React.Component {
  componentDidMount() {
    const data = fetchStatData("2017-1", "RSA")
    /* this will require me to difine a function on PropTypes  */
    // eslint-disable-next-line
    this.props.dispatch(data)
  }

  render() {
    /* this will require me to difine a shape on PropTypes  */
    // eslint-disable-next-line
    const { statistics } = this.props
    if(statistics.fetching){
      return(
        <div>
        <Navigation />
          <h2>Loading...</h2>
        </div>
      )
    }
    if(!statistics.fetched){
      return(
        <div>
          <Navigation />
          <div className="error">
            <h1>Fail to get Data from API.</h1>
            <h1>API might be down</h1>
          </div>
        </div>
      )
    }
    return(
      <div>
        <Navigation />

        <StatTable
          proposals = { statistics.data.proposals }
          targets = { statistics.data.targets }
        />
      </div>
      );
    }
  }



export default connect(
  store => ({statistics: store.statistics}),null
)(StatisticsPage) ;
