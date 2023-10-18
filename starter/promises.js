'use strict';

const wait = function (time) {
  return new Promise(resolve => {
    setTimeout(resolve, time * 1000);
  });
};

// wait(5)
//   .then(() => {
//     console.log('waited 5 seconds');
//     return wait(4);
//   })
//   .then(() => {
//     console.log('waited 4 seconds');
//     return wait(3);
//   })
//   .then(() => {
//     console.log('waited 3 seconds');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('waited 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('waited 1 seconds');
//   })
//   .catch(err => console.log(err));

// geolocation api
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      err => reject({ error: 'location not found!' })
    );
  });
};

getPosition()
  .then(data => console.log(data))
  .catch(err => console.log(err));
console.log('Getting location');
