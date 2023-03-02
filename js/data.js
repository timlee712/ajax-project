/* exported data */

var data = {
  favorites: []
};

window.addEventListener('beforeunload', function () {
  var favoriteString = JSON.stringify(data.favorites);
  this.localStorage.setItem('favoriteAgents', favoriteString);
});

if (localStorage.getItem('favorites')) {
  data.favorites = JSON.parse(localStorage.getItem('favorites'));
}
