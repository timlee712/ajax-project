// Carousel
var carouselIndex = 1;
showImages(carouselIndex);

function previousImage() {
  clearInterval(timer);
  timer = setInterval(previousImage, 5000);
  showImages(carouselIndex += 1);
}
var timer = setInterval(previousImage, 5000);

function nextImage() {
  clearInterval(timer);
  timer = setInterval(previousImage, 5000);
  showImages(carouselIndex -= 1);
}

function showImages() {
  var images = document.querySelectorAll('.carousel-item');
  if (carouselIndex > images.length) {
    carouselIndex = 1;
  }
  if (carouselIndex < 1) {
    carouselIndex = images.length;
  }
  for (var i = 0; i < images.length; i++) {
    images[i].classList.add('hidden');
  }
  images[carouselIndex - 1].classList.remove('hidden');
  updateButton();
}
function updateButton() {
  var circleButton = document.querySelectorAll('.circle-button');
  for (var i = 0; i < circleButton.length; i++) {
    circleButton[i].classList.remove('filled');
  }
  circleButton[carouselIndex - 1].classList.add('filled');
}

var rightButton = document.querySelector('.button-right');
var leftButton = document.querySelector('.button-left');

rightButton.addEventListener('click', nextImage);
leftButton.addEventListener('click', previousImage);

function currentImage(n) {
  showImages(carouselIndex = n);
}

var agentsCarousel = document.querySelector('#agents-button');
agentsCarousel.addEventListener('click', function () {
  clearInterval(timer);
  timer = setInterval(previousImage, 5000);
  currentImage(1);
});
var mapsCarousel = document.querySelector('#maps-button');
mapsCarousel.addEventListener('click', function () {
  clearInterval(timer);
  timer = setInterval(previousImage, 5000);
  currentImage(2);
});
var weaponsCarousel = document.querySelector('#weapons-button');
weaponsCarousel.addEventListener('click', function () {
  clearInterval(timer);
  timer = setInterval(previousImage, 5000);
  currentImage(3);
});

// Dropdown Modal
var $dropdownBox = document.querySelector('.box');
var $dropdownModal = document.querySelector('.dropdown-menu');

$dropdownBox.addEventListener('click', function () {
  $dropdownModal.classList.toggle('hidden');
});

// viewSwap Function
function viewSwap(viewName) {
  var homePage = document.querySelector('.home');
  var agentsPage = document.querySelector('.agents');
  var mapsPage = document.querySelector('.maps');
  var weaponsPage = document.querySelector('.weapons');

  if (viewName === 'home') {
    homePage.className = 'home';
    agentsPage.className = 'agents hidden';
    mapsPage.className = 'maps hidden';
    weaponsPage.className = 'weapons hidden';
  } else if (viewName === 'agents') {
    homePage.className = 'home hidden';
    agentsPage.className = 'agents';
    mapsPage.className = 'maps hidden';
    weaponsPage.className = 'weapons hidden';
  } else if (viewName === 'maps') {
    homePage.className = 'home hidden';
    agentsPage.className = 'agents hidden';
    mapsPage.className = 'maps';
    weaponsPage.className = 'weapons hidden';
  } else if (viewName === 'weapons') {
    homePage.className = 'home hidden';
    agentsPage.className = 'agents hidden';
    mapsPage.className = 'maps hidden';
    weaponsPage.className = 'weapons';
  }
}

// event listener for tabs and drop down
var $homeTab = document.querySelector('.home-tab');
var $agentsTab = document.querySelector('.agents-tab');
var $mapsTab = document.querySelector('.maps-tab');
var $weaponsTab = document.querySelector('.weapons-tab');

$homeTab.addEventListener('click', function () {
  viewSwap('home');
  $dropdownModal.className = 'dropdown-menu hidden';

});

$agentsTab.addEventListener('click', function () {
  viewSwap('agents');
});

$mapsTab.addEventListener('click', function () {
  viewSwap('maps');
});

$weaponsTab.addEventListener('click', function () {
  viewSwap('weapons');
});

var $agentsDrop = document.querySelector('.agents-drop');
var $mapsDrop = document.querySelector('.maps-drop');
var $weaponsDrop = document.querySelector('.weapons-drop');

$agentsDrop.addEventListener('click', function () {
  viewSwap('agents');
  $dropdownModal.className = 'dropdown-menu hidden';
});

$mapsDrop.addEventListener('click', function () {
  viewSwap('maps');
  $dropdownModal.className = 'dropdown-menu hidden';

});

$weaponsDrop.addEventListener('click', function () {
  viewSwap('weapons');
  $dropdownModal.className = 'dropdown-menu hidden';

});
