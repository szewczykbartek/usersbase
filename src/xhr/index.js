import axios from 'axios'

let getWeather = function(location) {
  return axios.get("http://api.aerisapi.com/observations/"+location+"?client_id=L96zzXeLs1gBcbDsi0noe&client_secret=faEBiE34mPyEVqNwxpTDlz2cchR4a9fEsnGKnAMG")
  //return axios.get("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+location+"')&format=json")
}

export { getWeather }
