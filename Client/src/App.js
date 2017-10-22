import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
/* 
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import TopNavigation from "./components/navigation/TopNavigation"; */
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import GuestRoute from "./components/routes/GuestRoute";
import UserRoute from "./components/routes/UserRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./components/ForgotPassword/ResetPassword";
import ConfirmationPage from "./components/Dashboard/ConfirmationPage";

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    {/* {isAuthenticated && <TopNavigation />} */}
    <GuestRoute location={location} path="/login" exact component={Login} />
    <GuestRoute location={location} path="/signup" exact component={SignUp} />
    <UserRoute location={location} path="/" exact component={Dashboard} />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPassword}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
