import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { settingEdit, settingDetail, userAdd } from "../actions/";

import countriesData from "../xhr/countries.json";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToDashboard: false
    };


    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let userData = {
      firstname: this.refs.firstname.value,
      surname: this.refs.surname.value,
      country: this.refs.country.value,
      city: this.refs.city.value,
      gender: this.refs.gender.value,
      cover: 'https://graph.facebook.com/1702972235/picture?type=large'
    };

    this.props.userAdd(userData);
    this.setState({ redirectToDashboard: true });

    e.preventDefault();
  }

  render() {
    if (this.state.redirectToDashboard)
      return <Redirect to="/" />;

    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit} ref={form => (this.form = form)}>
            <div className="card">
              <div className="header">
                <h4 className="title">Add User</h4>
              </div>
              <div className="content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control border-input"
                        ref="firstname"
                        name="firstname"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control border-input"
                        ref="surname"
                        name="surname"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control border-input"
                        ref="city"
                        name="city"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        className="form-control border-input"
                        ref="country"
                        name="country"
                      >
                      {countriesData.map((country, i) => (
                        <option key={country.code} value={country.name}>{country.name}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        className="form-control border-input"
                        ref="gender"
                        name="gender"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-info btn-fill btn-wd"
                  >
                    Add user
                  </button>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </form>
        </div>
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
    settingEdit: bindActionCreators(settingEdit, dispatch),
    settingDetail: bindActionCreators(settingDetail, dispatch),
    userAdd: bindActionCreators(userAdd, dispatch)
  };
}
export default connect(mapStateToProps, matchDispatchToProps)(UserEdit);
