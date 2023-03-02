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
  var searchResults = document.querySelector('.search-results');

  if (viewName === 'home') {
    homePage.className = 'home';
    agentsPage.className = 'agents hidden';
    mapsPage.className = 'maps hidden';
    weaponsPage.className = 'weapons hidden';
    searchResults.className = 'search-results hidden';
  } else if (viewName === 'agents') {
    homePage.className = 'home hidden';
    agentsPage.className = 'agents';
    mapsPage.className = 'maps hidden';
    weaponsPage.className = 'weapons hidden';
    searchResults.className = 'search-results hidden';
  } else if (viewName === 'maps') {
    homePage.className = 'home hidden';
    agentsPage.className = 'agents hidden';
    mapsPage.className = 'maps';
    weaponsPage.className = 'weapons hidden';
    searchResults.className = 'search-results hidden';
  } else if (viewName === 'weapons') {
    homePage.className = 'home hidden';
    agentsPage.className = 'agents hidden';
    mapsPage.className = 'maps hidden';
    weaponsPage.className = 'weapons';
    searchResults.className = 'search-results hidden';
  } else if (viewName === 'search-results') {
    homePage.className = 'home hidden';
    agentsPage.className = 'agents hidden';
    mapsPage.className = 'maps hidden';
    weaponsPage.className = 'weapons hidden';
    searchResults.className = 'search-results';

  }
}

// event listener for tabs and drop down
var $homeTab = document.querySelector('.home-tab');
var $agentsTab = document.querySelector('.agents-tab');
var $mapsTab = document.querySelector('.maps-tab');
var $weaponsTab = document.querySelector('.weapons-tab');
var $searchButton = document.querySelector('.search-button');
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

$searchButton.addEventListener('click', function () {
  viewSwap('search-results');
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

// triggering a button click on enter
var input = document.querySelector('.search-input');
input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter' && input.value !== '') {
    event.preventDefault();
    document.querySelector('.search-button').click();
    input.value = '';
  }
});

// loop through agents to get their names and portraits
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function () {
  var agents = JSON.parse(this.responseText).data;

  agents.sort(function (a, b) {
    var nameA = a.displayName.toUpperCase();
    var nameB = b.displayName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  for (var i = 0; i < agents.length; i++) {
    var agent = agents[i];
    var agentName = agent.displayName;
    var agentPortrait = agent.fullPortrait;

    // to get rid of the duplicate Sova
    if (agentName === 'Sova' && agent.isPlayableCharacter !== true) {
      continue;
    }

    var agentNameElement = document.createElement('p');
    agentNameElement.innerText = agentName;
    agentNameElement.className = 'agent-name';

    var agentContainer = document.createElement('div');
    agentContainer.className = 'agent-container';

    var starButton = document.createElement('button');
    starButton.className = 'star-button';

    starButton.addEventListener('click', function () {
      var favoriteClass = 'favorite';
      var parentElement = this.parentElement;
      if (this.classList.contains(favoriteClass)) {
        parentElement.style.order = '';
      } else {
        parentElement.style.order = -1;
      }
      this.classList.toggle(favoriteClass);
    });

    var starIcon = document.createElement('i');
    starIcon.className = 'fa-solid fa-star';

    var agentImageContainer = document.createElement('div');
    agentImageContainer.className = 'agent-image-container';

    if (agentPortrait) {
      var agentImage = document.createElement('img');
      agentImage.className = 'agent-image';
      agentImage.src = agentPortrait;
      agentImageContainer.appendChild(agentImage);
    }

    agentContainer.appendChild(agentNameElement);
    starButton.appendChild(starIcon);
    agentContainer.appendChild(starButton);
    agentContainer.appendChild(agentImageContainer);

    document.getElementById('agents-list').appendChild(agentContainer);
  }
});
xhr.open('GET', 'https://valorant-api.com/v1/agents', true);
xhr.send();

// loop through maps to get their names and splashe images
var xhr2 = new XMLHttpRequest();
xhr2.addEventListener('load', function () {

  var maps = JSON.parse(this.responseText).data;
  maps.sort(function (a, b) {
    var nameA = a.displayName.toUpperCase();
    var nameB = b.displayName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  for (var i = 0; i < maps.length; i++) {
    var map = maps[i];
    var mapName = map.displayName;
    var mapSplash = map.splash;

    var mapNameElement = document.createElement('p');
    mapNameElement.innerText = mapName;
    mapNameElement.className = 'map-name';

    var starButton = document.createElement('button');
    starButton.className = 'star-button';

    starButton.addEventListener('click', function () {
      var favoriteClass = 'favorite';
      var parentElement = this.parentElement;
      if (this.classList.contains(favoriteClass)) {
        parentElement.style.order = '';
      } else {
        parentElement.style.order = -1;
      }
      this.classList.toggle(favoriteClass);
    });

    var starIcon = document.createElement('i');
    starIcon.className = 'fa-solid fa-star';

    var mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';

    var mapImageContainer = document.createElement('div');
    mapImageContainer.className = 'map-image-container';

    if (mapSplash) {
      var mapImage = document.createElement('img');
      mapImage.className = 'map-image';
      mapImage.src = mapSplash;
      mapImageContainer.appendChild(mapImage);
    }

    mapContainer.appendChild(mapNameElement);
    starButton.appendChild(starIcon);
    mapContainer.appendChild(starButton);
    mapContainer.appendChild(mapImageContainer);

    document.getElementById('maps-list').appendChild(mapContainer);
  }
}
);
xhr2.open('GET', 'https://valorant-api.com/v1/maps', true);
xhr2.send();

// loop through weapons to get their names and weapon images
var xhr3 = new XMLHttpRequest();
xhr3.addEventListener('load', function () {
  var weapons = JSON.parse(this.responseText).data;

  weapons.sort(function (a, b) {
    var costA = (a.shopData && a.shopData.cost) || 0;
    var costB = (b.shopData && b.shopData.cost) || 0;
    return costA - costB;
  });

  for (var i = 0; i < weapons.length; i++) {
    var weapon = weapons[i];
    var weaponName = weapon.displayName;
    var weaponIcon = weapon.displayIcon;

    var weaponNameElement = document.createElement('p');
    weaponNameElement.innerText = weaponName;
    weaponNameElement.className = 'weapon-name';

    var starButton = document.createElement('button');
    starButton.className = 'star-button';

    starButton.addEventListener('click', function () {
      var favoriteClass = 'favorite';
      var parentElement = this.parentElement;
      if (this.classList.contains(favoriteClass)) {
        parentElement.style.order = '';
      } else {
        parentElement.style.order = -1;
      }
      this.classList.toggle(favoriteClass);
    });

    var starIcon = document.createElement('i');
    starIcon.className = 'fa-solid fa-star';

    var weaponContainer = document.createElement('div');
    weaponContainer.className = 'weapon-container';

    var weaponImageContainer = document.createElement('div');
    weaponImageContainer.className = 'weapon-image-container';

    if (weaponIcon) {
      var weaponImage = document.createElement('img');
      weaponImage.className = 'weapon-image';
      weaponImage.src = weaponIcon;
      weaponImageContainer.appendChild(weaponImage);
    }

    weaponContainer.appendChild(weaponNameElement);
    starButton.appendChild(starIcon);
    weaponContainer.appendChild(starButton);
    weaponContainer.appendChild(weaponImageContainer);

    document.getElementById('weapons-list').appendChild(weaponContainer);
  }
}
);
xhr3.open('GET', 'https://valorant-api.com/v1/weapons', true);
xhr3.send();

// search bar

var searchButtons = document.querySelectorAll('.search-button');
searchButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();

    var searchInput = this.parentNode.querySelector('.search-input').value.toLowerCase();
    var searchXhr = new XMLHttpRequest();
    var url = 'https://valorant-api.com/v1/agents';
    searchXhr.addEventListener('load', function () {
      var agents = JSON.parse(this.responseText).data;
      var searchResultsDiv = document.getElementById('search-results');
      var searchResultsHTML = ' <div class="grey-page"> ' + '<div>' + '<div class="header">' + '<h1>Search Results</h1>' + '</div>' + '</div>' + '</div>';
      agents.forEach(function (agent) {
        if (agent.displayName.toLowerCase().includes(searchInput)) {
          if (agent.displayName === 'Sova' && agent.isPlayableCharacter !== true) {
            return;
          }

          searchResultsHTML += '<div class="search-container">';
          searchResultsHTML += '<p class="search-name">' + agent.displayName + '</p>';
          searchResultsHTML += '<div class="search-image-container">';
          if (url.includes('/maps/')) {
            searchResultsHTML += '<img src="' + agent.splash + '" alt="' + agent.displayName + '" class="search-image">';
          } else if (url.includes('/weapons/')) {
            searchResultsHTML += '<img src="' + agent.displayIcon + '" alt="' + agent.displayName + '" class="search-image">';
          } else {
            searchResultsHTML += '<img src="' + agent.fullPortrait + '" alt="' + agent.displayName + '" class="search-image">';
          }
          searchResultsHTML += '</div>';
          searchResultsHTML += '</div>';

        }
      });
      if (searchResultsHTML) {
        searchResultsDiv.innerHTML = searchResultsHTML;
        searchResultsDiv.classList.remove('hidden');
        viewSwap('search-results');
        searchInput.value = '';
        searchInput.placeholder = 'Search';
      } else {
        searchResultsDiv.innerHTML = '';
        searchResultsDiv.classList.add('hidden');
      }
    });

    if (searchInput === 'ascent' || searchInput === 'bind' || searchInput === 'haven' || searchInput === 'icebox' || searchInput === 'split' || searchInput === 'pearl' || searchInput === 'breeze' || searchInput === 'fracture' || searchInput === 'lotus') {
      url = 'https://valorant-api.com/v1/maps/';
    } else if (searchInput === 'classic' || searchInput === 'shorty' || searchInput === 'frenzy' || searchInput === 'ghost' || searchInput === 'sheriff' || searchInput === 'stinger' || searchInput === 'spectre' || searchInput === 'bucky' || searchInput === 'judge' || searchInput === 'bulldog' || searchInput === 'guardian' || searchInput === 'phantom' || searchInput === 'vandal' || searchInput === 'marshal' || searchInput === 'operator' || searchInput === 'odin' || searchInput === 'ares') {
      url = 'https://valorant-api.com/v1/weapons/';
    }
    searchXhr.open('GET', url);
    searchXhr.send();
  });
});
