import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../../messages/ConfirmEmailMessage";
import * as actions from "../../actions/auth";

class Dashboard extends Component {
  render() {
    const { logout, isConfirmed } = this.props;
    return (
      <div>
        <h1>Dashboard Page</h1>
        {!isConfirmed && <ConfirmEmailMessage />}
        <p>Welcome User !!</p>
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(Dashboard);
