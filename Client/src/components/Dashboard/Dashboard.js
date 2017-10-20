import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

class Dashboard extends Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h1>Dashboard Page</h1>
        <p>Welcome User !!</p>
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout: actions.logout })(Dashboard);
