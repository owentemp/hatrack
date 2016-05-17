var m = require('mithril')


//this application only has one component: todo
var todo = {};

//for simplicity, we use this component to namespace the model classes

//the Todo class has two properties
todo.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
};

//the TodoList class is a list of Todo's
todo.TodoList = Array;

//the view-model tracks a running list of todos,
//stores a description for new todos before they are created
//and takes care of the logic surrounding when adding is permitted
//and clearing the input after adding a todo to the list
todo.vm = (function() {
    var vm = {}
    vm.init = function() {
        //a running list of todos
        vm.list = new todo.TodoList();

        //a slot to store the name of a new todo before it is created
        vm.description = m.prop("");

        //adds a todo to the list, and clears the description field for user convenience
        vm.add = function() {
            if (vm.description()) {
                vm.list.push(new todo.Todo({description: vm.description()}));
                vm.description("");
            }
        };
        vm.session = function() {
            if (todo.vm.list.length > 0) {
                hatSession(todo.vm.list);
                console.log(todo.vm.list);
            } else {
              alert("Add some hats to the rack first")
            }

              //run hat session by pulling random activity from hat
            function hatSession(bucket) {

              var moreHat;
              console.log(bucket.length);

                alert('Roll the dice to see which of your "hats" you will wear next.');
                var ri = Math.floor(Math.random() * bucket.length);// Random Index position in the array
                nextHat = bucket[ri].description(); //
                bucket.splice(ri, 1); // Splice out 1 random element using the ri var
                var t = 0; //counter to count how many repeated sessions with the hat have occurred
                console.log(nextHat);
                alert("Your next activity will be " + nextHat);
                // var timerLength;
                // do {
                   alert('Roll the dice to see how long your next hat session will be.');
                   vm.timerLength = (Math.floor( Math.random() * 25) + 1);
                   alert("You rolled " + vm.timerLength + ", so focus on " + nextHat + " for the next " + vm.timerLength + " minutes. Click OK to start timer.");
                //   //start timer







                //   moreHat = prompt('Do you want to wear your ' + nextHat + ' hat for another session? Yes or No?');
                //   if (moreHat === null) {
                //     throw new Error("You chose CANCEL, so the program will end. Come back again soon!");
                //   }


                // } while (moreHat === 'YES'||
                //      moreHat === 'Y' ||
                //      moreHat === 'yes' ||
                //      moreHat === 'y');



              // alert("You've worn all your hats today, congratulations");
              // alert("Your HatRack score today is " + score);
            }




        };
    }
    return vm
}())

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
todo.controller = function() {
    todo.vm.init()
}

//here's the view
todo.view = function() {
  return m("div", [
    m("img", {class: "hat", src:"/assets/hat.jpg"}),
    m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
    m("button", {onclick: todo.vm.add}, "Add Hat to Rack"),
    m("hr"),
    m("table", [
      todo.vm.list.map(function(task, index) {
        return m("tr", [
          m("td", [
            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
            ]),
          m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
          ])
      })
      ]),
    m("hr"),
    m("div", [
      m("button", {class:"btn btn-primary btn-block focus", onclick: todo.vm.session}, "Focus"),
      ]),
    m("div", {id: "clock"}, [
      m("h1", {class:"minutes"}, todo.vm.timerLength),
      ]),
    ]);
};

//initialize the application
// m.mount(document, {controller: todo.controller, view: todo.view});

exports.controller = todo.controller;

exports.view = todo.view;


