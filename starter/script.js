'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0]?.code}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = '1';
};

const renderError = function (err) {
  countriesContainer.insertAdjacentText(
    'beforeend',
    `Something went wrong...${err} 💥💥💥`
  );
};

const getJSON = function (url, err = 'Something went wrong') {
  return fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`${err}...${response.status}`);
    }
  });
};

const whereAmI = function (lat, lng) {
  return fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  ).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Something went wrong...TRY AGAIN');
    }
  });
};

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      err => reject({ error: 'location not found!' })
    );
  });
};

// const getCountryAndNeighbour = function (country) {
//   const xhr = new XMLHttpRequest();
//   xhr.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   xhr.send();
//   xhr.addEventListener('load', function () {
//     if (xhr.status === 200) {
//       const response = xhr.response;
//       const [data] = JSON.parse(response);
//       console.log(data);

//       // Display contry
//       renderCountry(data);

//       const neighbour = data.borders?.[0];

//       if (!neighbour) return;

//       const url = `
//       https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`;
//       const xhr2 = new XMLHttpRequest();
//       xhr2.open('GET', url);
//       xhr2.addEventListener('load', function () {
//         const response2 = xhr2.response;
//         const data = JSON.parse(response2);
//         console.log(data);
//         renderCountry(data, 'neighbour');
//       });
//       xhr2.send();
//     } else {
//       const html = `<h2>Data can't be fetched!</h2>`;
//       countriesContainer.insertAdjacentHTML('beforeend', html);
//     }
//     countriesContainer.style.opacity = '1';
//   });
// };

// using promises

// const getCountryAndNeighbour = function (lat, lng) {
//   let country;
//   whereAmI(lat, lng).then(data => {
//     const country = data.countryName;
//     console.log(country);
//     getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//       .then(data => {
//         renderCountry(data[0]);
//         console.log(data[0]);
//         const [neighbour] = data[0].borders;
//         console.log(neighbour);

//         if (!neighbour) throw new Error('No neighbour country!');

//         return getJSON(
//           `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//         );
//       })
//       .then(data => renderCountry(data, 'neighbour'))
//       .catch(err => renderError(err))
//       .finally(() => (countriesContainer.style.opacity = '1'));
//   });
// };

// const getCountryAndNeighbour2 = function () {
//   getPosition().then(data => {
//     const { latitude: lat, longitude: lng } = data;
//     whereAmI(lat, lng)
//       .then(data => {
//         console.log(data.countryName);
//         getJSON(
//           `https://countries-api-836d.onrender.com/countries/name/${data.countryName}`
//         ).then(data => {
//           renderCountry(data[0]);
//           console.log(data[0]);
//           const [neighbour] = data[0].borders;
//           console.log(neighbour);

//           if (!neighbour) throw new Error('No neighbour country!');

//           return getJSON(
//             `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//           );
//         });
//       })
//       .then(data => renderCountry(data, 'neighbour'))
//       .catch(err => renderError(err))
//       .finally(() => (countriesContainer.style.opacity = '1'));
//   });
// };

// using async/await function

const getCountryAndNeighbour3 = async function () {
  try {
    const { latitude, longitude } = await getPosition();
    const respGeo = await whereAmI(latitude, longitude);
    if (!respGeo) throw new Error('Problem getting location data');
    const country_data = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${respGeo.countryName}`
    );
    if (!country_data) throw new Error('Problem getting country');
    renderCountry(country_data[1]);
    const [neighbour] = country_data[1].borders;
    if (!neighbour) throw new Error('No neighbour country');
    const neighbour_data = await getJSON(
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    renderCountry(neighbour_data, 'neighbour');
    return `You live in ${respGeo.city}, ${respGeo.countryName}`;
  } catch (err) {
    countriesContainer.insertAdjacentText('beforeend', `${err}`);
    countriesContainer.style.opacity = '1';

    // throw error manually from an async so to reject a promise of the async function
    throw err;
  }
};

// btn.addEventListener('click', function () {
//   getCountryAndNeighbour('australia');
// });

// btn.addEventListener('click', getCountryAndNeighbour3);

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
*/

// getCountryAndNeighbour(52.508, 13.381);
// getCountryAndNeighbour(-33.933, 18.474);

// Returning values from an async. function

// getCountryAndNeighbour3()
//   .then(data => console.log(`2: ${data}`))
//   .catch(err => console.log(`${err} 💥💥💥`))
//   .finally(() => console.log(`3:Finished getting location`));

// console.log(`1-Will get loction`);

// (async function init() {
//   try {
//     const resp = await getCountryAndNeighbour3();
//     console.log(resp);
//   } catch (err) {
//     console.log(`${err} 💥💥💥`);
//   }
//   console.log(`3:Finished getting location`);
// })();

// const getThreeCountryCapital = async function (c1, c2, c3) {
//   // const [{ capital: capital1 }] = await getJSON(
//   //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
//   // );
//   // console.log(capital1);
//   // const [{ capital: capital2 }] = await getJSON(
//   //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
//   // );
//   // console.log(capital2);
//   // const [{ capital: capital3 }] = await getJSON(
//   //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
//   // );
//   // console.log(capital3);

//   //running parallel promises!
//   return Promise.all([
//     await getJSON(
//       `https://countries-api-836d.onrender.com/countries/name/${c1}`
//     ),
//     await getJSON(
//       `https://countries-api-836d.onrender.com/countries/name/${c2}`
//     ),
//     await getJSON(
//       `https://countries-api-836d.onrender.com/countries/name/${c3}`
//     ),
//   ]);
// };

// getThreeCountryCapital('USA', 'Spain', 'Australia')
//   .then(arr => {
//     const capitals = arr.map(([ele]) => ele.capital);
//     console.log(capitals);
//   })
//   .catch(err => console.log(err));

// const getThreeCountryCapital2 = async function (c1, c2, c3) {
//   // const [{ capital: capital1 }] = await getJSON(
//   //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
//   // );
//   // console.log(capital1);
//   // const [{ capital: capital2 }] = await getJSON(
//   //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
//   // );
//   // console.log(capital2);
//   // const [{ capital: capital3 }] = await getJSON(
//   //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
//   // );
//   // console.log(capital3);

//   //running parallel promises!
//   return Promise.allSettled([
//     await getJSON(
//       `https://countries-api-836d.onrender.com/countries/name/${c1}`
//     ),
//     await getJSON(
//       `https://countries-api-836d.onrender.com/countries/name/${c2}`
//     ),
//     await getJSON(
//       `https://countries-api-836d.onrender.com/countries/name/${c3}`
//     ),
//   ]);
// };

// getThreeCountryCapital2('USA', 'Spain', 'Australia')
//   .then(arr => {
//     const capitals = arr.map(ele => {
//       const {
//         value: [{ capital }],
//       } = ele;
//       return capital;
//     });
//     console.log(capitals);
//   })
//   .catch(err => console.log(err));

// Promise.any()
const getThreeCountry3 = async function (c1, c2, c3) {
  return Promise.any([
    await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${c1}`
    ),
    await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${c2}`
    ),
    await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${c3}`
    ),
  ]);
};

getThreeCountry3('USA', 'Spain', 'Australia').then(result =>
  console.log(result)
);
