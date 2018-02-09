var util = require("util");
var EventEmitter = require("events");

function User() {

}

util.inherits(User, EventEmitter);

var event1 = "greet";
var event2 = "test";
var event3 = "never reached event";

User.prototype.sayHi = function(data) {
  this.emit(event1, data);
  //this.emit(event2);
}

var user = new User();

user.on(event1, function(data) {
  console.log(data);
});

user.on(event2, () => {
  console.log("test");
});

user.sayHi("Hi there");