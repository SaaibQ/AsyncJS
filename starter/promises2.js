'use strict';

// Promise.all() method

// const promise1 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 1 resolved');
//       resolve(20);
//     }, 1000);
//   });
// };

// const promise2 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 2 reject');
//       reject(10);
//     }, 2000);
//   });
// };

// console.log('Promise .all()');
// Promise.all([promise1(), promise2()])
//   .then(results => console.log(results))
//   .catch(err => console.log(`ERROR: `, err));

//Promise.allSettled()
// const promise3 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 3 resolved');
//       resolve(20);
//     }, 1000);
//   });
// };

// const promise4 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 4 reject');
//       reject(100);
//     }, 2000);
//   });
// };

// const promise5 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 5 resolved');
//       resolve(200);
//     }, 5000);
//   });
// };

// Promise.allSettled([promise3(), promise4(), promise5()])
//   .then(results => console.log(results))
//   .catch(err => console.log(`ERROR: ${err}`));

// Promise.race()
// const promise6 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 6  resolved');
//       resolve(20);
//     }, 3000);
//   });
// };

// const promise7 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 7 reject');
//       reje(100);
//     }, 2000);
//   });
// };

// const promise8 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('Promise 8 resolved');
//       resolve(200);
//     }, 5000);
//   });
// };

// Promise.race([promise6(), promise7(), promise8()])
//   .then(results => console.log(results))
//   .catch(err => console.log(`ERROR: ${err}`));

// const arr = [10, 20, 30, 40];
// const total = arr.reduce((acc, val) => {
//   return acc + val;
// }, 10);
// console.log(total);

//promise.any()
