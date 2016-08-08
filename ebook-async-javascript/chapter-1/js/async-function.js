var functionHasReturned = false;
asyncFunction(function() {
console.log(functionHasReturned);
});
functionHasReturned = true;