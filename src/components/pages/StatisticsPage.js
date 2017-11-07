import React from "react";
import { connect } from "react-redux"
import Navigation from "../Navigation";
import { fetchStatData } from "../../actions/statisticsActions";
import StatTable from "../tables/StatTable";
import Selector from "../selectors/Selector";

class StatisticsPage extends React.Component {
  componentWillMount() {
    const data = fetchStatData("2017-1", "RSA")
    /* this will require me to difine a function on PropTypes  */
    // eslint-disable-next-line
    this.props.dispatch(data)
  }

  render() {
    /* this will require me to difine a shape on PropTypes  */
    // eslint-disable-next-line
    const { statistics } = this.props
    const {  semesters, partners } = statistics.data
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


    let partnerList = partners.map( partner =>
      partner.PartnerCode
    )
    const semesterList = semesters.map( semester =>
      `${semester.Year.toString()}-${semester.Semester.toString()}`
    )
    partnerList = ["All"].concat(partnerList)

    return(
      <div>
        <Navigation />
        <div>
          <span className="left">
            <Selector
                name="Semester"
                options={semesterList} />
          </span>
          <span className="left">
            <Selector
                name="Partners"
                options={partnerList} />
          </span>
        </div>
        <StatTable
          proposals = {statistics.data.proposals}
          targets = { statistics.data.targets }
        />
      </div>
      );
    }
  }


export default connect(
  store => ({statistics: store.statistics}),null
)(StatisticsPage) ;
