import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { settingEdit, settingDetail } from "../actions/";

import UserDetail from "../components/UserDetail";

// Component

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.settingEdit = this.settingEdit.bind(this);
    this.settingDetail = this.settingDetail.bind(this);
  }

  settingEdit(id) {
    this.props.settingEdit(id);
  }
  settingDetail(id) {
    this.props.settingDetail(id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-8 col-md-7">
          <div className="card">
            <div className="header">
              <h4 className="title">Users</h4>
            </div>
            <div className="content">
              <ul className="list-unstyled team-members">

              {this.props.reducer_users.map((user, i) => (
                <li key={user.id}>
                  <div className="row">
                    <div className="col-xs-3">
                      <div className="avatar">
                        <img
                          src={user.cover}
                          className="img-circle img-no-padding img-responsive"
                          alt="..."
                        />
                      </div>
                    </div>
                    <div className="col-xs-6">
                      {user.firstname} {user.surname}
                      <br />
                      <span className="text-muted">
                        <small>{user.country} {user.city}, {user.gender}</small>
                      </span>
                    </div>
                    <div className="col-xs-3 text-right">
                      <button className="btn btn-sm btn-success btn-icon" onClick={e => this.settingDetail(user.id)}>
                        <i className="fa fa-envelope" />Detail
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-5">
          <UserDetail />
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
    settingDetail: bindActionCreators(settingDetail, dispatch)
  };
}
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
