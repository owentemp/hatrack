var m = require('mithril')
var MyComponent = require('./components/MyComponent');
var Todo= require('./components/Todo');
var Timer= require('./components/Timer');

//
// Global variable for global state (e.g. currentUser)
//
window.App = {}

//
// Client-side routing
//
m.route.mode = 'pathname'
m.route(document.getElementById('app'), '/', {

  '/': {
    // Controllers are optional
    controller: function () {},

    view: function (ctrl) {
      return m('.app', [
        // m('h1', 'HatRack App'),
        m.component(MyComponent, { title: 'Wear your many hats' }),
        m.component(Todo),
        // m.component(Timer)
      ])
    }
  }

})







