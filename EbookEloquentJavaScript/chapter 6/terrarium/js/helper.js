    function forEachIn(object, action) {
      for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property))
          action(property, object[property]);
      }
    }

    // The reduce Function
    function forEach(array, action) {
      for (var i = 0; i < array.length; i++)
        action(array[i]);
    }

    function bind(func, object) {
      return function(){
        return func.apply(object, arguments);
      };
    }

    // var testArray = [];
    // var pushX = bind(testArray.push, testArray);
    // pushX("A");
    // pushX("B");
    // testArray;

    // In the expression bind(testArray.push, testArray), the name testArray still occurs twice. Some people prefer this, more succinct approach to method binding:
    function method(object, name) {
      return function() {
        object[name].apply(object, arguments);
      };
    }

    // var pushX = method(x, "push");

    var wall = {};
    wall.character = "#";

    // function elementFromCharacter(character) {
    //   if (character == " ")
    //     return undefined;
    //   else if (character == "#")
    //     return wall;
    //   else if (character == "o")
    //     return new StupidBug();
    // }

    function characterFromElement(element) {
      if (element == undefined)
        return " ";
      else
        return element.character;
    }

    function elementFromCharacter(character) {
      if (character == " ")
        return undefined;
      else if (character == "#")
        return wall;
      else if (creatureTypes.contains(character))
        return new (creatureTypes.lookup(character))();
      else
        throw new Error("Unknown character: " + character);
    }

    function randomElement(array) {
      if (array.length == 0)
        throw new Error("The array is empty.");
      return array[Math.floor(Math.random() * array.length)];
    }

    function findDirections(surroundings, wanted) {
      var found = [];
      directions.each(function(name) {
        if (surroundings[name] == wanted)
          found.push(name);
      });
      return found;
    }
