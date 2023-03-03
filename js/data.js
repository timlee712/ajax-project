/* exported data */

var data = {
  favorites: [],
  agents: [],
  maps: [],
  weapons: []
};

window.addEventListener('beforeunload', function () {
  var favoriteString = JSON.stringify(data.favorites);
  this.localStorage.setItem('favoriteAgents', favoriteString);
});

if (localStorage.getItem('favoriteAgents')) {
  data.favorites = JSON.parse(localStorage.getItem('favoriteAgents'));
}
