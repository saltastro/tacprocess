import React from "react";
import { connect } from "react-redux"
import InfoMessage from "../messages/InfoMessage";
import Navigation from "../Navigation";
// eslint-disable-next-line
import { fetchStatData, convertData } from "../../actions/statisticsActions";
import StatTable from "../tables/StatTable";

class StatisticsPage extends React.Component {
  componentDidMount() {

    const data = fetchStatData("2017-1")
    console.log("Moun",data())
    this.props.dispatch(data)
  }

  // fetchStataData(){
  //   this.props.dispatch(setStatData)
  // }
  render() {
    const { statistics } = this.props
    // if(!statistics.length){
    //   this.fetchStataData
    // }
    // const mapP =

    return(

      <div>
        <Navigation />
        <InfoMessage page="Statistics" />
        {console.log("Stat", statistics.proposals)}

        <StatTable proposal = {{}} />
      </div>
      );
    }
  }


export default connect(store => ({statistics: store.statistics.data}),
null)(StatisticsPage) ;
