import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { settingEdit, settingDetail, userSave, userRemove } from "../actions/";

import countriesData from "../xhr/countries.json";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "-1"
    };
    this.settingEdit = this.settingEdit.bind(this);
    this.settingDetail = this.settingDetail.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userRemove = this.userRemove.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== this.props.reducer_setting.edit) {
      const usersFind = this.props.reducer_users;
      let usersFindIndex = usersFind.findIndex(
        a => a.id === this.props.reducer_setting.edit
      );
      if (usersFindIndex > -1) {
        this.setState({
          id: this.props.reducer_setting.edit,
          firstname: this.props.reducer_users[usersFindIndex].firstname,
          surname: this.props.reducer_users[usersFindIndex].surname,
          city: this.props.reducer_users[usersFindIndex].city,
          country: this.props.reducer_users[usersFindIndex].country,
          gender: this.props.reducer_users[usersFindIndex].gender,
          cover: this.props.reducer_users[usersFindIndex].cover
        });
      }
    }
  }

  settingEdit(id) {
    this.props.settingEdit(id);
  }
  settingDetail(id) {
    this.props.settingDetail(id);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    let userData = {
      firstname: this.refs.firstname.value,
      surname: this.refs.surname.value,
      country: this.refs.country.value,
      city: this.refs.city.value,
      gender: this.refs.gender.value,
      cover: this.refs.cover.value
    };
    console.log(userData);

    this.props.settingEdit(-1);
    this.props.userSave(this.props.reducer_setting.edit, userData);
    e.preventDefault();
  }
  userRemove(id) {
    this.props.settingEdit(-1);
    this.props.settingDetail(-1);
    this.props.userRemove(id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4 className="title">All users</h4>
              <p className="category">Lorem lipsum</p>
            </div>
            <div className="content table-responsive table-full-width">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.reducer_users.map((user, i) => (
                    <tr key={user.id}>
                      <td>
                        {user.firstname} {user.surname}
                      </td>
                      <td>{user.country}</td>
                      <td>{user.city}</td>
                      <td>{user.gender}</td>
                      <td>
                        <button
                          className="btn btn-info btn-fill btn-sm"
                          onClick={e => this.settingEdit(user.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          {this.props.reducer_setting.edit > -1 ? (
            <div>
              <form
                onSubmit={this.handleSubmit}
                ref={form => (this.form = form)}
              >
                <div className="card">
                  <div className="header">
                    <h4 className="title">Edit Profile</h4>
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
                            value={this.state.firstname || ""}
                            onChange={this.handleChange}
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
                            value={this.state.surname || ""}
                            onChange={this.handleChange}
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
                            value={this.state.city || ""}
                            onChange={this.handleChange}
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
                            value={this.state.country || ""}
                            onChange={this.handleChange}
                          >
                            {countriesData.map((country, i) => (
                              <option
                                key={country.code}
                                value={country.name || ""}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Gender</label>
                          <div>
                            <select
                              className="form-control border-input"
                              ref="gender"
                              name="gender"
                              value={this.state.gender || ""}
                              onChange={this.handleChange}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <input
                        type="hidden"
                        className="form-control border-input"
                        ref="cover"
                        name="cover"
                        value={this.state.cover || ""}
                        onChange={this.handleChange}
                      />
                      <button
                        type="submit"
                        className="btn btn-info btn-fill btn-wd"
                      >
                        Update Profile
                      </button>

                      <button
                        className="btn btn-danger btn-fill btn-wd"
                        onClick={e =>
                          this.userRemove(this.props.reducer_setting.edit)
                        }
                      >
                        Remove Profile
                      </button>
                    </div>
                    <div className="clearfix" />
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <h2 />
          )}
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
    userSave: bindActionCreators(userSave, dispatch),
    userRemove: bindActionCreators(userRemove, dispatch)
  };
}
export default connect(mapStateToProps, matchDispatchToProps)(UserEdit);
