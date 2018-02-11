import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter, Route }  from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import StatisticsPage from "./components/pages/StatisticsPage";
import TechReviewPage from "./components/pages/TechReviewPage";
import TimeAllocationPage from "./components/pages/TimeAllocationPage";
import DocumentationPage from "./components/pages/DocumentationPage";
import AdminPage from "./components/pages/AdminPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import Navigation from "./components/Navigation";
import Filters from "./components/Filters";
import * as actions from './actions/auth';
import fetchTargets from './actions/targetsActions';
import { storePartnerAllocations } from './actions/timeAllocationActions';
import fetchProposals from './actions/proposalsActions';

class App extends React.Component {
    componentDidMount() {
    	if (this.props.isAuthenticated) {
            const selected = this.props.filters;
            const {dispatch} = this.props;

            dispatch(actions.fetchUserData());
            dispatch(
                    fetchTargets(
                            selected.selectedSemester,
                            selected.selectedPartner
                    ));
            dispatch(
                    fetchProposals(
                            selected.selectedSemester,
                            selected.selectedPartner
                    ));
            dispatch(storePartnerAllocations(
                    selected.selectedSemester,
                    selected.selectedPartner
            ));
        }
    }

    loggingOut = () => {
        const { dispatch } = this.props;
        dispatch(actions.logout())
    };

    render() {
		const isAuthenticated = this.props.isAuthenticated;

		return (
				<BrowserRouter>
					<div className="root-main">
						{isAuthenticated ? (
								<div>
									<Navigation logout={this.loggingOut}/>
								</div>

						) : (
								<div>
									<h1 className="login-txt">Please Login</h1>
								</div>

						)}
						<div>

							{isAuthenticated ? <Filters/> : <div/>}
							<div className="main-div">
								<Route path="/" exact component={HomePage}/>
								<GuestRoute path="/login" exact component={LoginPage} isAuthenticated={isAuthenticated}/>
								<UserRoute path="/statistics" exact component={StatisticsPage}
										   isAuthenticated={isAuthenticated}/>
								<UserRoute path="/timeallocation" exact component={TimeAllocationPage}
										   isAuthenticated={isAuthenticated}/>
								<UserRoute path="/techreview" exact component={TechReviewPage}
										   isAuthenticated={isAuthenticated}/>
								<UserRoute path="/documentation" exact component={DocumentationPage}
										   isAuthenticated={isAuthenticated}/>
								<UserRoute path="/admin" exact component={AdminPage} isAuthenticated={isAuthenticated}/>
							</div>
							<div className="footer">
								<p>Copyright © 2018 TAC</p>
							</div>
						</div>
					</div>
				</BrowserRouter>
		);
	}
}

App.propTypes = {
	isAuthenticated: PropTypes.bool
};

function mapStateToProps(state) { /* state in params */
	return{
		isAuthenticated: state.user.user.isAuthenticated,
		filters: state.filters
	};
}

export default connect(mapStateToProps,null)(App);
