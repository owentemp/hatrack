var m = require('mithril')

var login = {};


login.controller = function () {}

login.view = function (ctrl, options) {
  return m('nav', [
    m('button[type=button]', {class: "btn btn-default navbar-btn"}, "Log in/Sign up")
  ])
}




// m.mount(document, {controller: todo.controller, view: todo.view});

exports.controller = login.controller;

exports.view = login.view;
