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
        vm.score = 0;

        //adds a todo to the list, and clears the description field for user convenience
        vm.add = function() {
          if (vm.description()) {
            vm.list.push(new todo.Todo({description: vm.description()}));
            vm.description("");
          }
        };
        vm.session = function() {
          if (todo.vm.list.length > 0) {
            vm.hatSession(todo.vm.list);
            console.log(todo.vm.list);
          } else {
            alert("Add some hats to the rack first")
          }
        };
        //run hat session by pulling random activity from hat
         vm.hatSession = function (bucket) {

            vm.moreHat;
             console.log(bucket.length);

            alert('Roll the dice to see which of your "hats" you will wear next.');
            var ri = Math.floor(Math.random() * bucket.length);// Random Index position in the array
            vm.nextHatStatus = bucket[ri].done;
            vm.nextHat = bucket[ri].description(); //
            bucket.splice(ri, 1); // Splice out 1 random element using the ri var
            var t = 0; //counter to count how many repeated sessions with the hat have occurred
            console.log(vm.nextHat);
            alert("Your next activity will be " + vm.nextHat);
            vm.hatSession2(vm.nextHat);
          };

          vm.hatSession2 = function (hat) {
          // var timerLength;
          // do {
            alert('Roll the dice to see how long your next hat session will be.');
            vm.timerLength = (Math.floor( Math.random() * 25) + 1);
            alert("You rolled " + vm.timerLength + ", so focus on " + hat + " for the next " + vm.timerLength + " minutes. Click OK to start timer.");
          //   //start timer
          var temp = vm.timerLength * 60;
          // temp=30;
          vm.startTimer(temp);
        };

        vm.startTimer = function (duration) {
          var timer = duration, minutes, seconds;
          var intervalID = setInterval(function () {
            m.startComputation()
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            vm.timerLength = minutes + ":" + seconds;

            if (--timer < 0) {
              clearInterval(intervalID);
              vm.timerLength = "";
              vm.score += 5;
              vm.moreHat = prompt('Do you want to wear your ' + vm.nextHat + ' hat for another session? Yes or No?');
              if (vm.moreHat === null) {
                throw new Error("You chose CANCEL, so the program will end. Come back again soon!");
              } else if (vm.moreHat === 'YES'||
                     vm.moreHat === 'Y' ||
                     vm.moreHat === 'yes' ||
                     vm.moreHat === 'y') {
                vm.hatSession2(vm.nextHat);
              }
              vm.nextHatStatus(true);
            }
            m.endComputation();
          }, 1000);

          vm.endTimer = function () {
            clearInterval(intervalID);
            vm.timerLength = "";
          };
        };









              // alert("You've worn all your hats today, congratulations");
              // alert("Your HatRack score today is " + score);
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
    m("input", {class:"add", onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
    m("button", {class: "btn btn-default", onclick: todo.vm.add}, "Add Hat to Rack"),
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
      m("button", {class:"btn btn-primary btn-block focus", onclick: todo.vm.session}, "Focus Session"),
      ]),
    m("div", {id: "clock"}, [
      m("h1", {class:"minutes", onclick: todo.vm.endTimer}, todo.vm.timerLength),
      ]),
    m("h2", {class:"score"},"Score: ", todo.vm.score )
    ]);
};

//initialize the application
// m.mount(document, {controller: todo.controller, view: todo.view});

exports.controller = todo.controller;

exports.view = todo.view;


