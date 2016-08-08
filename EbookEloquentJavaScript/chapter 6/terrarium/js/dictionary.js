    // Dictionary constructor
    function Dictionary(startValues) {
      this.values = startValues || {};
    }

    Dictionary.prototype.store = function(name, value) {
      this.values[name] = value;
    };
    Dictionary.prototype.lookup = function(name) {
      return this.values[name];
    };
    Dictionary.prototype.contains = function(name) {
      return Object.prototype.propertyIsEnumerable.call(this.values, name);
    };
    Dictionary.prototype.each = function(action) {
      forEachIn(this.values, action);
    };
    Dictionary.prototype.names = function() {
      var names = [];
      this.each(function(name, value) {names.push(name);});
      return names;
    };
    // // Here’s a small piece of code to test the new type:
    // var colors = new Dictionary({Grover: "blue",
    //   Elmo: "red",
    //   Bert: "yellow"});
    // colors.contains("Grover");
    // colors.contains("constructor");
    // colors.store("Ernie", "orange");
    // colors.each(function(name, color) {
    //   console.log(name, " is ", color);
    // });