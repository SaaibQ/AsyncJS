///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
*/
const images = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;
    imgEl.addEventListener('load', function () {
      images.append(imgEl);
      resolve(imgEl);
    });
    imgEl.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadAll = async function (imgsPath) {
  const imgArr = imgsPath.map(async img => {
    const imgShown = await createImage(img);
    imgShown.classList.add('parallel');
  });
  console.log(imgArr);
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

const wait = function (time) {
  return new Promise(resolve => {
    console.log('5 seconds waited');
    setTimeout(resolve, 1000 * time);
  });
};

// const loadNPause = async function () {
//   try {
//     const img1 = await createImage('img/img-1.jpg');
//     await wait(5);
//     img1.style.display = 'none';
//     const img2 = await createImage('img/img-2.jpg');
//     await wait(5);
//     img2.style.display = 'none';
//     const img3 = await createImage('img/img-3.jpg');
//   } catch (err) {
//     console.log(`ERROR: ${err}`);
//   }
// };

// loadNPause();
