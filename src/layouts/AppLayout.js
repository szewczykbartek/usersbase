import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { usersImport } from "../actions/";

import usersData from "../xhr/data.json";

// Component

import UserList from "../components/UserList";
import UserEdit from "../components/UserEdit";
import UserAdd from "../components/UserAdd";

import "../assets/css/bootstrap.min.css";
import "../assets/css/paper-dashboard.css";
import "../assets/css/themify-icons.css";

class AppLayout extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.usersImport(usersData);
  }

  render() {
    return (
      <div className="app">
        <Router>
        <div className="wrapper">
          <div
            className="sidebar sidebar-sticky"
            data-background-color="white"
            data-active-color="danger"
          >
            <div className="sidebar-wrapper">
              <div className="logo">
                <div className="simple-text">Menu</div>
              </div>

              <ul className="nav">
                <li>
                  <NavLink to="/">
                    <i className="ti-panel" />
                    <p>Dashboard</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/edit">
                    <i className="ti-user" />
                    <p>Edit users</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/add">
                    <i className="ti-view-list-alt" />
                    <p>Add users</p>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="main-panel">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar bar1" />
                    <span className="icon-bar bar2" />
                    <span className="icon-bar bar3" />
                  </button>
                  <a className="navbar-brand">
                    Users Base
                  </a>
                </div>
              </div>
            </nav>

            <div className="content">
              <div className="container-fluid">
                <Route exact path="/" component={UserList} />
                <Route path="/edit" component={UserEdit} />
                <Route path="/add" component={UserAdd} />
              </div>
            </div>

          </div>
        </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reducer_users: state.reducer_users,
    reducer_setting: state.reducer_setting
  };
}

function matchDispatchToProps(dispatch) {
  return {
    usersImport: bindActionCreators(usersImport, dispatch)
  };
}
export default connect(mapStateToProps, matchDispatchToProps)(AppLayout);
