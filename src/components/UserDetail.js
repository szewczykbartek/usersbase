import React from "react";
import { connect } from "react-redux";


import countriesData from "../xhr/countries.json";
import { getWeather } from "../xhr";

// Component

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather_id: 0,
      weather_humidity: "",
      weather_temp: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.reducer_setting.detail > -1) {
      const usersFind = this.props.reducer_users;
      const usersFindIndex = usersFind.findIndex(
        a => a.id === this.props.reducer_setting.detail
      );


      let index = countriesData.findIndex(a => a.name === this.props.reducer_users[usersFindIndex].country);
      let location = this.props.reducer_users[usersFindIndex].city+','+countriesData[index]['code'].toLowerCase()

      console.log(location);
      getWeather(location).then(results => {
        if (results.data.success == true) {
          if (prevState.weather_id !== results.data.response.id) {
            this.setState({
              weather_id: results.data.response.id,
              weather_humidity: results.data.response.ob.humidity,
              weather_temp: results.data.response.ob.tempC,
              weather_wind: results.data.response.ob.windSpeedKPH,
              weather_desc: results.data.response.ob.weather
            });
          }
        }
      });
    }
  }

  render() {
    const usersFind = this.props.reducer_users;
    const usersFindIndex = usersFind.findIndex(
      a => a.id === this.props.reducer_setting.detail
    );

    let maps;
    if (this.props.reducer_setting.detail > -1)
      maps =
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        this.props.reducer_users[usersFindIndex].city +
        "&zoom=12&size=400x400";

    return (
      <div>
        {this.props.reducer_setting.detail > -1 ? (
          <div>
            <div className="card card-user">
              <div className="image">
                <img
                src={maps}
                alt="..."
                />
              </div>
              <div className="content">
                <div className="author">
                  <img
                    className="avatar border-white"
                    alt="..."
                    src={this.props.reducer_users[usersFindIndex].cover}
                  />
                  <h4 className="title">
                    {this.props.reducer_users[usersFindIndex].firstname} {this.props.reducer_users[usersFindIndex].surname}
                    <br />
                    <small>{this.props.reducer_users[usersFindIndex].country}{" "}{this.props.reducer_users[usersFindIndex].city}</small>
                    <small>{this.props.reducer_users[usersFindIndex].gender}</small>
                  </h4>
                </div>
                <p className="description text-center">
                  {this.state.weather_desc}
                </p>
              </div>
              <hr />
              <div className="text-center">
                <div className="row">
                  <div className="col-md-3 col-md-offset-1">
                    <h5>
                      {this.state.weather_temp} C<br />
                      <small>Temperature</small>
                    </h5>
                  </div>
                  <div className="col-md-4">
                    <h5>
                      {this.state.weather_humidity}%<br />
                      <small>Humidity</small>
                    </h5>
                  </div>
                  <div className="col-md-3">
                    <h5>
                      {this.state.weather_wind}<br />
                      <small>Wind</small>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2></h2>
        )}
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
  return {};
}
export default connect(mapStateToProps, matchDispatchToProps)(UserDetail);
