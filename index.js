const {fetchMyIP} = require('./iss')

const {fetchCoordsByIP} = require('./iss')
const {fetchFlyOver} = require('./iss')
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});













// fetchFlyOver({ latitude: '200', longitude: '200' }, (error, data) => console.log(error, data))
// fetchCoordsByIP("66.207.199.230", (error, data) => console.log(error, data))


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

