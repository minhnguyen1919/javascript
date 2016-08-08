    function Lichen() {
      this.energy = 5;
    }

    Lichen.prototype.act = function(surroundings) {
      var emptySpace = findDirections(surroundings, " ");
      if (this.energy >= 13 && emptySpace.length > 0)
        return {type: "reproduce", direction: randomElement(emptySpace)};
      else if (this.energy < 20)
        return {type: "photosynthesize"};
      else
        return {type: "wait"};
    };
    creatureTypes.register(Lichen, "*");
