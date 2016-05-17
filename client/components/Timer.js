var m = require('mithril')


//this application only has one component: todo
var timer = {};

//for simplicity, we use this component to namespace the model classes

//the Todo class has two properties
timer.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

//the TodoList class is a list of Todo's
timer.TodoList = Array;

//the view-model tracks a running list of todos,
//stores a description for new todos before they are created
//and takes care of the logic surrounding when adding is permitted
//and clearing the input after adding a todo to the list
timer.vm = (function() {
    var vm = {}
    vm.init = function() {
        //a running list of todos
        vm.list = new timer.TodoList();

        //a slot to store the name of a new todo before it is created
        vm.description = m.prop("");

        //adds a todo to the list, and clears the description field for user convenience
        vm.add = function() {
            if (vm.description()) {
                vm.list.push(new timer.Todo({description: vm.description()}));
                vm.description("");
            }
        };
    }
    return vm
}())

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
timer.controller = function() {
    timer.vm.init()
}

//here's the view
timer.view = function() {
  return m("div", [
    m("input", {onchange: m.withAttr("value", timer.vm.description), value: timer.vm.description()}),
    m("button", {onclick: timer.vm.add}, "Add"),
    m("table", [
      timer.vm.list.map(function(task, index) {
        return m("tr", [
          m("td", [
            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
            ]),
          m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
          ])
      })
      ])
    ]);
};

//initialize the application
// m.mount(document, {controller: todo.controller, view: todo.view});

exports.controller = timer.controller;

exports.view = timer.view;


