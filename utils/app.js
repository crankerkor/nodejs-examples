var utils = require("util");

function Base() {
  this.name = "base"
}

Base.prototype.say = function () {
  console.log("this is a %s function", this.name);
}

function Derived() {
  this.name = "derived";
}

utils.inherits(Derived, Base);

Derived.prototype.getData = function () {
  console.log("data from %s function", this.name);
}

var derived = new Derived();
var base = new Base();

base.say();
derived.getData();
derived.say();

var user  = {
  name : "Emmett Brown",
  age : 18,
  currentActivity : "learning fucking javascript basics",
  inspect : function () {
    console.log("{name - %s, age - %d, currentActivity - %s}", this.name, this.age, this.currentActivity);
  }
}

var str = utils.format("\nName - %s.\nAge - %d.\nNow %s.", user.name, user.age, user.currentActivity);
var objInfo = utils.inspect(user);

console.log(str);
console.log();
console.log("%j", user);
console.log();
console.log(objInfo);
console.log();
user.inspect();
