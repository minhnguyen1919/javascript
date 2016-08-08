    var creatureTypes = new Dictionary();
    creatureTypes.register = function(constructor, character) {
      constructor.prototype.character = character;
      this.store(character, constructor);
    };

    function StupidBug() {};
    StupidBug.prototype.act = function(surroundings) {
      return {type: "move", direction: "s"};
    };

    // StupidBug.prototype.character = "o";
    creatureTypes.register(StupidBug, "o");




    function BouncingBug() {
      this.direction = "ne";
    }

    BouncingBug.prototype.act = function(surroundings) {
      if (surroundings[this.direction] != " ")
        this.direction = (this.direction == "ne" ? "sw" : "ne");
      return {type: "move", direction: this.direction};
    };

    creatureTypes.register(BouncingBug, "%");


    function DrunkBug() {};
    DrunkBug.prototype.act = function(surroundings) {
      return {type: "move", direction: randomElement(directions.names())};
    };
    creatureTypes.register(DrunkBug, "~");


    



