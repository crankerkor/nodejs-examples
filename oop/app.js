var util = require("util");

function ParClass(par1, par2){
  this.parentField1 = par1;
  this.parentField2 = par2;
}
ParClass.prototype.parMethod = function(param){
  console.log("parent method:" + param);
}

ParClass.prototype.parentField = "parent";

util.inherits(ChildClass, ParClass);
function ChildClass(par1, par2){
  ChildClass.super_.apply(this, arguments);
  this.childField1 = par1;
  this.childField2 = par2;
}

function override(child, fn){
  child.prototype[fn.name] = fn;
  fn.inherited = child.super_.prototype[fn.name];
}

override(ChildClass, function parMethod(par){
    parMethod.inherited.call(this, par);
    console.log("child method");
});

ChildClass.prototype.childField = "child field";

var child = new ChildClass("khomiak", "yurii");

var parent = new ParClass("Khomiak", "vasyl");

console.dir({
  parent: parent,
  child: child
});

child.parMethod("parameter");
