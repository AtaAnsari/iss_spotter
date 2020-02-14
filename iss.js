const request = require('request')

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body)
    const ip = data.ip
    callback(null, ip)
  }

  )
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const geoData = JSON.parse(body).data
    // console.log(data)
    const latLong = {}
    latLong["latitude"] = geoData["latitude"]
    latLong["longitude"] = geoData["longitude"]
    callback(null, latLong)

  })
}

const fetchFlyOver = function(latLong, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latLong.latitude}&lon=${latLong.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover information. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyoverData = JSON.parse(body).response
    // console.log(data)
    
    callback(null, flyoverData)

  })
}

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error , ip) => {
    if (error){
      callback(error, null)
      return
    }
    fetchCoordsByIP(ip, (error, latLong) => {
      if (error){
        callback(error, null)
        return
      }
      fetchFlyOver(latLong, (error, passTimes) => {
        if (error){
          callback(error, null)
          return
        }
        callback(null, passTimes)
      })
    })
  })
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchFlyOver,
  nextISSTimesForMyLocation

};