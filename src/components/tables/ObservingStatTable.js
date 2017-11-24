/* eslint-disable */
import React from "react";
import propTypes from "prop-types";

const moonFilter = (proposals, semester) => {
    const dark = []
    const grey = []
    const bright = []
    const any = []
    let darkTotal = 0
    let greyTotal = 0
    let brightTotal = 0
    let anyTotal = 0
    const transparency = {
      clear: 0,
      thin: 0,
      thick: 0,
      any: 0
    }
    proposals.map( p => {
      p.requestedTime.map(t => {
        if (t.forSemester === semester){
          if(t.moon === "Dark" && t.time !== 0){
            dark.push(p)
            darkTotal +=  t.time
          }
          if(t.moon === "Grey" && t.time !== 0){
            grey.push(p)
            greyTotal +=  t.time
          }
          if(t.moon === "Bright" && t.time !== 0){
            bright.push(p)
            brightTotal +=  t.time
           }
          if(t.moon === "Any" && t.time !== 0){
            any.push(p)
            anyTotal +=  t.time
           }
        }

      })
        if(p.transparency === "Any"){
             transparency.any +=1
        }
        if(p.transparency === "Thin cloud"){
             transparency.thin +=1
        }
        if(p.transparency === "Thick cloud"){
             transparency.think +=1
        }
        if(p.transparency === "Clear"){
             transparency.clear +=1
        }
      return p
    })
    return {
      dark: dark,
      grey: grey,
      bright: bright,
      any: any,
      darkTotal: darkTotal/(60*60),
      greyTotal: greyTotal/(60*60),
      brightTotal: brightTotal/(60*60),
      anyTotal: anyTotal/(60*60)
    };
  }

const getMatch = (a, b) => {
      const matches = [];

      for ( let i = 0; i < a.length; i++ ) {
          for ( let e = 0; e < b.length; e++ ) {
              if ( a[i] === b[e] ) matches.push( a[i] );
          }
      }
      return matches;
  }

class ObservingStatTable extends React.Component {
  render() {
    const { proposals, semester} = this.props
    const moonFiltered = moonFilter(proposals, semester)
    return(
      <div>
      <h1>Observing Statistics</h1>
        <table className="table center-table">
          <thead>
            <tr>
              <th><h2>Conditions</h2></th>
              <th><h2>Time requested (hrs)</h2></th>
              <th><h2>Number of Proposals</h2></th>
              <th><h2>Fraction of Total Request (%)</h2></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><h3>Dark</h3></td>
              <td><h3>{moonFiltered.darkTotal}</h3></td>
              <td><h3>{moonFiltered.dark.length}</h3></td>
              <td><h3>{0}</h3></td>
            </tr>
            <tr>
              <td><h3>Grey</h3></td>
              <td><h3>{moonFiltered.greyTotal}</h3></td>
              <td><h3>{moonFiltered.grey.length}</h3></td>
              <td><h3>{0}</h3></td>
            </tr>
            <tr>
              <td><h3>Bright</h3></td>
              <td><h3>{moonFiltered.brightTotal}</h3></td>
              <td><h3>{moonFiltered.bright.length}</h3></td>
              <td><h3>{0}</h3></td>
            </tr>
            <tr>
              <td><h3>Any</h3></td>
              <td><h3>{moonFiltered.anyTotal}</h3></td>
              <td><h3>{moonFiltered.any.length}</h3></td>
              <td><h3>{0}</h3></td>
            </tr>
            <tr />


          </tbody>
        </table>
      </div>
      );
    }
  }

  ObservingStatTable.propTypes = {
    proposals: propTypes.array.isRequired ,
    semester: propTypes.string.isRequired ,
  }

export default ObservingStatTable;
