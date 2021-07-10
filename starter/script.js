'use strict';
/*
// onmouseenter event
let header1 = document.querySelector('h1');
function mouseEnterH1() {
  alert('hello world');
  header1.removeEventListener('mouseenter', mouseEnterH1);
  }
  header1.addEventListener('mouseenter', mouseEnterH1);
  // event propogation
  function randomRgb() {
    return `${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
      )},${Math.floor(Math.random() * 256)}`;
}
let navLinkNodeList = document.querySelectorAll('.nav__link');
console.log(navLinkNodeList[0]);
navLinkNodeList[0].href = '#';
let featuresNavLink = navLinkNodeList[0];
function featuresClicked(event) {
  this.style.backgroundColor = `rgb(${randomRgb()})`;
  // event.stopPropagation();
}
featuresNavLink.addEventListener('click', featuresClicked);
function boxWithLinksClicked() {
  this.style.backgroundColor = `rgb(${randomRgb()})`;
}
let boxWithNavLinks = document.querySelector('.nav__links');
boxWithNavLinks.addEventListener('click', boxWithLinksClicked);
function boxWithBoxOfLinksClicked(event) {
  this.style.backgroundColor = `rgb(${randomRgb()})`;
  console.log(event.target);
  console.log(event.currentTarget);
}
let boxWithBoxOfLinks = document.querySelector('.nav');
boxWithBoxOfLinks.addEventListener('click', boxWithBoxOfLinksClicked);

*/
/*
// lecture part
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
let headerElement = document.querySelector('.header');
let sectionNodeList = document.querySelectorAll('.section');
console.log(sectionNodeList);
console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');
// A html collection is a live list so if we delete an element the list is updated
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));
// adding some HTML
// creates <div> and </div>
let message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
'We use cookies to improve user experience.<button class="btn btn--close-cookie">Got it</button>';
// adds the element in brackets as the child of other element
//live addition so if we prepend first then append then only append is taken can be used to move elements
headerElement.append(message);
// headerElement.append(message.cloneNode(true));
// delete elements
function removeCookieMessage() {
  message.remove();
  // before
  // message.parentElement.removeChild(message)
}
document
.querySelector('.btn--close-cookie')
.addEventListener('click', removeCookieMessage);
// css styles
// inline styles added to html element and CSS file is not modified
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// doesnt print anything because cant read css file
console.log(message.style.color);
console.log(message.style.backgroundColor);
// reading from css file
// console.log(getComputedStyle(message));
console.log(Number.parseFloat(getComputedStyle(message).height) + 40 + 'px');
message.style.height =
Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
document.documentElement.style.setProperty('--color-primary', 'orangered');
// attributes
let logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.className);
console.log(logo.alt);
logo.alt = 'beautiful minimalist logo';
console.log(logo.getAttribute('src'));
// each element is supposed to have some standard attributes for example image should have src and alt but we can create new ones also we cannot make changes to non standard attributes using logo. syntax
console.log(logo.getAttribute('designer'));
logo.setAttribute('designer', 'hello world');
// data attributes start with the word data
console.log(logo.dataset.versionNumber);
*/
///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
let navBar = document.querySelector('.nav');
let boxOfNavLinks = document.querySelector('.nav__links');
// nodelist one at top and one at bottom
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
let boxOfTabbedComponentButtons = document.querySelector(
  '.operations__tab-container'
);
let tabButtonNodeList = document.querySelectorAll('.btn.operations__tab');
let displayContentNodeList = document.querySelectorAll('.operations__content');
let section1 = document.querySelector('#section--1');
let learnMoreButton = document.querySelector('.btn--text.btn--scroll-to');
let header = document.querySelector('.header');
let sectionNodeList = document.querySelectorAll('.section');
let imagesToLoadNodeList = document.querySelectorAll('img[data-src]');
let slider = document.querySelector('.slider');
let sliderButtonLeft = document.querySelector('.slider__btn--left');
let sliderButtonRight = document.querySelector('.slider__btn--right');
let slideNodeList = document.querySelectorAll('.slide');
let dotContainer = document.querySelector('.dots');
// function to create dot componrnt need to be on top of the page as it is adding html which needs to be accessed in several places
// these 3 need to be at the top of the program
let arrayOfPercentages = [0, 100, 200];
function createDots() {
  // since we need one dot for each slide
  slideNodeList.forEach((node, index, slideNodeList) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
}
createDots();
function setActiveDot() {
  dotsNodeList.forEach(node => node.classList.remove('dots__dot--active'));
  arrayOfPercentages.forEach((percentage, index) => {
    if (percentage === 0) {
      let activeDot = document.querySelector(
        `.dots__dot[data-slide="${index}"]`
      );
      activeDot.classList.add('dots__dot--active');
    }
  });
}
const openModal = function (event) {
  // preventing default behaviour of link element href part which points to beginning of website
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// scroll to top whenever user reloads not done
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };
/*
we can replace this with the foreach method
for (let i = 0; i <div btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
*/
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// smooth scrolling on learn more button

function smoothScrollerSection1() {
  /*
    top is top of viewport to top of selected element
    let coordinatesOfSection1 = section1.getBoundingClientRect();
    console.log('section one coordinates', coordinatesOfSection1);
    // scroll position y is top of viewport to top of website
    console.log('ScrollPosition (x,y)', window.pageXOffset, window.pageYOffset);
    // details of viewport
    console.log(
      '(height,width) of viewport',
      document.documentElement.clientHeight,
      document.documentElement.clientWidth
    );
    //scrolling
    window.scrollTo({
        left: coordinatesOfSection1.left + window.pageXOffset,
        top: coordinatesOfSection1.top + window.pageYOffset,
        behavior: 'smooth',
      });
  */
  section1.scrollIntoView({ behavior: 'smooth' });
}
learnMoreButton.addEventListener('click', smoothScrollerSection1);
// implementing smooth scrolling for each nav element
// method 1
/*
make a node list of each element with class .nav__links
use for each method and in eack link
  attach a click event handler
    prevent default
    take the href of that element and select the destination element from it using queryselector
    scroll to that selected element
*/
// method 2
// event propogation can be used here instead of attaching a handler to each function as it is more efficient
// listen for the click even in a parent element
function navLinkClicked(event) {
  event.preventDefault();
  let clickedLink = event.target;
  // matching strategy
  if (
    clickedLink.classList.contains('nav__link') &&
    clickedLink.classList.contains('btn--show-modal') === false
  ) {
    let idToSelect = clickedLink.getAttribute('href');
    document.querySelector(idToSelect).scrollIntoView({ behavior: 'smooth' });
  }
}
// tabbed component
boxOfNavLinks.addEventListener('click', navLinkClicked);
function tabClicked(event) {
  function removeActive(node) {
    node.classList.remove('operations__tab--active');
  }
  function removeText(node) {
    node.classList.remove('operations__content--active');
  }

  let tab = event.target.closest('.operations__tab');
  // guard clause if we click on the box instead of the button then the box has no parent class with that name so the method returns null and we can check for this
  tabButtonNodeList.forEach(removeActive);
  if (tab) {
    displayContentNodeList.forEach(removeText);
    let tabNumber = tab.getAttribute('data-tab');
    displayContentNodeList[tabNumber - 1].classList.add(
      'operations__content--active'
    );
    tabButtonNodeList[tabNumber - 1].classList.add('operations__tab--active');
  }
}
boxOfTabbedComponentButtons.addEventListener('click', tabClicked);
//  fade away animation in nav bar
/*
function mouseOverLink(event) {
  
  
}
}
function mouseExitLink(event) {
  let exitingWhichLink = event.target;
  if (exitingWhichLink.classList.contains('nav__link')) {
    exitingWhichLink.closest('.nav').firstElementChild.style.opacity = 1;
    exitingWhichLink
    .closest('.nav')
    .querySelectorAll('.nav__link')
    .forEach(link => {
      if (link !== exitingWhichLink) {
        link.style.opacity = 1;
      }
    });
  }
}
*/

// we can refactor above code
function blurrNavBar(event) {
  let linkToOperateOn = event.target;
  if (linkToOperateOn.classList.contains('nav__link')) {
    linkToOperateOn.closest(
      '.nav'
    ).firstElementChild.style.opacity = this.opacityParameter;
    linkToOperateOn
      .closest('.nav')
      .querySelectorAll('.nav__link')
      .forEach(link => {
        if (link !== linkToOperateOn) {
          link.style.opacity = this.opacityParameter;
        }
      });
  }
}
navBar.addEventListener('mouseout', blurrNavBar.bind({ opacityParameter: 1 }));
navBar.addEventListener(
  'mouseover',
  blurrNavBar.bind({ opacityParameter: 0.5 })
);
// can be replaced with an intersection API
/*
// sticky navigaion Navigation bar sticks with the top even when scrolling inneficient method
let section1Coordinates = section1.getBoundingClientRect();
function makeNavbarSticky() {
  // we cannot determine the y position of the top of section 1 as it is dependent on the size of the viewport.For a small viewport we have to scroll less and more for a large viewport
  if (window.scrollY > section1Coordinates.top) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
}
window.addEventListener('scroll', makeNavbarSticky);
*/
let navBarHeight = navBar.getBoundingClientRect().height;
let apiOptions = {
  root: null,
  threshold: [0, 0.2],
  rootMargin: `-${navBarHeight}px`,
};
function apiCallback(stateArray, observerVariable) {
  // if intersecting is true it means header is entering the screen and if false it means header is leaving the screen
  if (stateArray[0].isIntersecting === false) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }
}
let headerObserver = new IntersectionObserver(apiCallback, apiOptions);
headerObserver.observe(header);
// hiding all sections
// sectionNodeList.forEach(node => {
//   node.classList.add('section--hidden');
// });
let apiOptionsForFadeInAnimation = {
  root: null,
  threshold: 0.15,
};
function afterIntersection(stateArray, observerApi) {
  let currentSection = stateArray[0];
  if (currentSection.isIntersecting) {
    currentSection.target.classList.remove('section--hidden');
    // observerApi.unobserve(currentSection.target);
  } else {
    currentSection.target.classList.add('section--hidden');
  }
}
let sectionObserver = new IntersectionObserver(
  afterIntersection,
  apiOptionsForFadeInAnimation
);
sectionNodeList.forEach(node => {
  sectionObserver.observe(node);
});
// lazy loading images
let lazyLoadApiOptions = {
  root: null,
  threshold: [0, 1],
  // here we are checking for intersection = truehence
  rootMargin: '200px',
};
function imageLoaded() {
  this.currentImageTarget.classList.remove('lazy-img');
}
function imageIntersected(stateArray, observerApi) {
  let currentImage = stateArray[0];
  // guard clause
  if (currentImage.isIntersecting === false) {
    return;
  }
  currentImage.target.src = currentImage.target.dataset.src;
  currentImage.target.addEventListener(
    'load',
    imageLoaded.bind({ currentImageTarget: currentImage.target })
  );
  observerApi.unobserve(currentImage.target);
}
let imageObserver = new IntersectionObserver(
  imageIntersected,
  lazyLoadApiOptions
);
imagesToLoadNodeList.forEach(node => {
  imageObserver.observe(node);
});
// slider component
function moveSlider() {
  slideNodeList.forEach((node, index) => {
    node.style.transform = `translate(${arrayOfPercentages[index]}%)`;
  });
}
let tempTransition = 0;
slideNodeList.forEach((node, index) => {
  node.style.transform = `translateX(${tempTransition}%)`;
  tempTransition += 100;
});

function RightButtonClicked() {
  if (arrayOfPercentages[2] === 0) {
    arrayOfPercentages = [0, 100, 200];
    moveSlider();
  } else if (arrayOfPercentages[0] > -200 && arrayOfPercentages[2] <= 200) {
    arrayOfPercentages.forEach((_, index, arrayOfPercentages) => {
      arrayOfPercentages[index] -= 100;
    });
    moveSlider();
  }
  setActiveDot();
}
sliderButtonLeft.addEventListener('click', leftButtonClicked);
function leftButtonClicked() {
  if (arrayOfPercentages[0] === 0) {
    arrayOfPercentages = [-200, -100, 0];
    moveSlider();
  } else if (arrayOfPercentages[0] >= -200 && arrayOfPercentages[2] < 200) {
    arrayOfPercentages.forEach((_, index, arrayOfPercentages) => {
      arrayOfPercentages[index] += 100;
    });
    moveSlider();
  }
  setActiveDot();
}
sliderButtonRight.addEventListener('click', RightButtonClicked);
// arrowkey component of the slider
function leftArrowKey(event) {
  if (event.key === 'ArrowLeft') {
    leftButtonClicked();
  }
}
window.addEventListener('keydown', leftArrowKey);
function rightArrowKey(event) {
  if (event.key === 'ArrowRight') {
    RightButtonClicked();
  }
}
window.addEventListener('keydown', rightArrowKey);
// dot compponent
let dotsNodeList = document.querySelectorAll('.dots__dot');
// clicking the buttons

function dotCliked(event) {
  let clickedDot = event.target;
  // guard clause
  if (clickedDot.classList.contains('dots__dot') === false) return;
  dotsNodeList.forEach(node => node.classList.remove('dots__dot--active'));
  clickedDot.classList.add('dots__dot--active');
  let slideIndex = clickedDot.dataset.slide;
  if (Number(slideIndex) === 0) {
    arrayOfPercentages = [0, 100, 200];
  }
  if (Number(slideIndex) === 1) arrayOfPercentages = [-100, 0, 100];
  if (Number(slideIndex) === 2) arrayOfPercentages = [-200, -100, 0];
  moveSlider();
}
dotContainer.addEventListener('click', dotCliked);
setActiveDot();
