const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
/*const images = ['mypic1.jpg', `mypic2.jpg`, `mypic3.jpg`, `mypic4.jpg`, `mypic5.jpg`];

/* Declaring the alternative text for each image file 
const alts = {
  'mypic1.jpg' : 'MJ and Garrett',
  'mypic2.jpg' : 'Garrett floating',
  'mypic3.jpg' : 'Euro car',
  'mypic4.jpg' : 'Euro swings',
  'mypic5.jpg' : 'Small telescope'
} */

const images = [
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic1.jpg?v=1731278069006',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic2.jpg?v=1731278079820',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic3.jpg?v=1731278101587',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic4.jpg?v=1731278169641',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic5.jpg?v=1731278181818'
];

/* Declaring the alternative text for each image */
const alts = {
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic1.jpg?v=1731278069006': 'MJ and Garrett',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic2.jpg?v=1731278079820': 'Garrett floating',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic3.jpg?v=1731278101587': 'Euro car',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic4.jpg?v=1731278169641': 'Euro swings',
  'https://cdn.glitch.global/34697f1a-3496-4248-a89f-5394f8ed6aed/mypic5.jpg?v=1731278181818': 'Small telescope'
};



/* Looping through images */
for (let i = 0; i < images.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute("src", images[i]);
  newImage.setAttribute("alt", alts[images[i]]);
  thumbBar.appendChild(newImage);


  newImage.addEventListener("click", () => {
    displayedImage.setAttribute("src", images[i]);
    displayedImage.setAttribute("alt", alts[images[i]]);
  });
}

/* Wiring up the Darken/Lighten button */
let toggle = false;
btn.addEventListener("click", () => {

  if (!toggle) {
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    toggle = true
    } 
  else {
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
    toggle = false
  }
});
/*btn.setAttribute("class", xxx);
btn.textContent = xxx;
overlay.style.backgroundColor = xxx; */