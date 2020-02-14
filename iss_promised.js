const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body)
  const ip = data.ip
  return request(`https://ipvigilante.com/${ip}`)
}

const fetchFlyOver = function(body) {
  const geoData = JSON.parse(body).data
  const latLong = {}
  latLong["latitude"] = geoData["latitude"]
  latLong["longitude"] = geoData["longitude"]
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latLong.latitude}&lon=${latLong.longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchFlyOver)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchFlyOver,
  nextISSTimesForMyLocation

};