/* exported data */

var data = {
  view: 'home',
  favorites: [],
  agents: [],
  maps: [],
  weapons: [],
  agentComps: []
};

window.addEventListener('beforeunload', function () {
  var favoriteString = JSON.stringify(data.favorites);
  this.localStorage.setItem('favoriteAgents', favoriteString);
});

if (localStorage.getItem('favoriteAgents')) {
  data.favorites = JSON.parse(localStorage.getItem('favoriteAgents'));
}
window.addEventListener('beforeunload', function () {
  var agentComps = JSON.stringify(data.agentComps);
  this.localStorage.setItem('agentComps', agentComps);
});

if (localStorage.getItem('agentComps')) {
  data.agentComps = JSON.parse(localStorage.getItem('agentComps'));
}
