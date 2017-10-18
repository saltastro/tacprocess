import React from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Button, Form } from "semantic-ui-react";


class Statistics extends  React.Component{


  render(){
    console.log(this.state);
    return(
      <div>
        <h1>Welcome to Statistics</h1>

        <Form >


          <Form.Field >
            <label>Total Proposals:
            <span ></span></label>

          </Form.Field>
          <Form.Field>
            <label>total Targets:
            <span></span></label>

          </Form.Field>
        </Form>

      </div>
    );
  }
}


export default Statistics;
