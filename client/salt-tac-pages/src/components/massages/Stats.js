import React from "react";

class Stats extends React.Component {

  constructor(props){
  	super(props);
  	this.state = {
      data:[]
    };
  }
  state = {};

  componentDidMount() {
    fetch('http://facebook.github.io/react-native/movies.json')
    .then((res) => res.json())
    .then((findRes) => {
      console.log(findRes);
    })
  }

  render() {
    return(
      <div>Stats pages hare!</div>
      );
    }
  }

export default Stats;
