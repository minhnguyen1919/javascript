alert(add(5,6));
function add(a, b){
  // add(5,6);
  a += 5;
  b *= 5;
  return a+b;
}

alert(multiplyAbsolute(-5, 6));

function multiplyAbsolute(number, factor) {
  function multiply(number) {
    console.log('multiplyAbsolute.multiply() number = ', number);
    console.log('something2 = ' , st);
    return number * factor;
  }
  if (number < 0)
    return multiply(-number);
  else
    return multiply(number);
}

function outside(){
  function inside(count){
    return count++;
  }
}

console.log(add(5));

function chicken() {
return egg();
}
function egg() {
return chicken();
}
print(chicken() + " came first.");

function createFunction() {
  var local = 100;
  return function(){return local;};
}

console.log(createFunction()());

var thing = {name: "Minh", age: 23};

console.log("name: ", thing.name);
console.log("age: ", thing["age"]);

var thing2 = {"full name": "Minh Nguyen", 0: 23};

// console.log("full name: ", thing2.full name);   //error
console.log("full name: ", thing2["full name"]);
// console.log("age: ", thing2.0);                 //error
console.log("age: ", thing2[5-5]);

console.log("full name" in thing);                 //->false
console.log("full name" in thing2);                //->true
console.log("name" in thing);                      //->true



var str= "hello every one";

console.log(str.indexOf("every"));
console.log(str.slice(6).split(" "));

var livingCats = {Spot: true};

function addToSet(set, values) {
for (var i = 0; i < values.length; i++)
set[values[i]] = true;
}

addToSet(livingCats, "Doo");


function between(string, start, end) {
  var startAt = string.indexOf(start) + start.length;
  console.log(startAt);
  var endAt = string.indexOf(end, startAt);
  console.log(endAt);
  return string.slice(startAt, endAt);
}
console.log(between("Louis 'Pops' Armstrong", "'", "'"));


var currentThing = null;
function processThing(thing) {
  var prevThing = currentThing;
  currentThing = thing;
  console.log("1",currentThing);
  /* do complicated processing... */
  currentThing = prevThing;
  console.log("2",currentThing);
}


processThing("hello")


//error message
try{
  print(something5);
}
catch(error){
  console.log(error.message);
}

Custom error message
try{
  throw new Error("do not exist something5");
}
catch(error){
  console.log(error.message);
}


var InvalidInputError = new Error("Invalid numeric input");
function inputNumber() {
  var input = Number(prompt("Give me a number", ""));
  if (isNaN(input))
    throw InvalidInputError;
  return input;
}

try {
  alert(inputNumber() + 5);
  // break;
}
catch (e) {
  if (e != InvalidInputError)
    throw e;
  alert("You did not input a number. Try again.");
}

function between(string, start, end) {
  var startAt = string.indexOf(start) + start.length;
  var endAt = string.indexOf(end, startAt);
  return string.slice(startAt, endAt);
}

function testBetween() {
  function assert(name, x) {
    if (!x)
      throw "Assertion failed: " + name;
  }
  assert("identical delimiters", between("a |b| c", "|", "|") == "b");
  assert("whole string", between("[[n]]", "[[", "]]") == "n");
  assert("reversed", between("]x[", "[", "]") == undefined);
  assert("missing end", between(" -->d ", "-->", "<--") == undefined);
  /* and so on */
}

testBetween();









/********************************************

                  CHAPTER 5 

********************************************/

//---------------Higher-Order Functions
function sub(a,b){
  return a+b;
}

function mul(a,b){
  return a*b;
}

console.log(mul(5,sub(2,4)));

var nameList = ["one", "two", "three", "four"];
nameList.forEach(function(entry) {
    console.log(entry);
});

function forEach(array, action) {
for (var i = 0; i < array.length; i++)
action(array[i]);
}

forEach(nameList,console);


//----------------Higher-Order Functions
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function sum(numbers) {
  var total = 0;
  forEach(numbers, function (number) {
    total += number;
  });
  return total;
}

console.log(sum([1,3,5,6]));



//---------------Modifying Functions

// Solution 1
function negate(func) {
  return function(x) {
    return !func(x);
  };
}

// Solution 2
function negate(func) {
  return function() {
    return !func.apply(null, arguments);
  };
}
var isNotNaN = negate(isNaN);
console.log(isNotNaN(5));



//----------------The reduce Function
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function reduce(combine, base, array) {
  forEach(array, function (element) {
    console.log(array);
    console.log(element);
    base = combine(base, element);
  });
  return base;
}
function add(a, b) {
  return a + b;
}
function sum(numbers) {
  return reduce(add, 0, numbers);
}

console.log(sum([5,6,7,8]));




function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function map(func, array) {
  var result = [];
  forEach(array, function (element) {
    result.push(func(element));
  });
  return result;
}
console.log(map(Math.round, [0.01, 2, 9.89, Math.PI]));