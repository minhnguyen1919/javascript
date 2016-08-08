function clone(object) {
  function OneShotConstructor(){}
  OneShotConstructor.prototype = object;
  return new OneShotConstructor();
}
function LifeLikeTerrarium(plan) {
  Terrarium.call(this, plan);
}
LifeLikeTerrarium.prototype = clone(Terrarium.prototype);
LifeLikeTerrarium.prototype.constructor = LifeLikeTerrarium;

LifeLikeTerrarium.prototype.processCreature = function(args) {
  var creature = args.object;
  var point = args.point;
  var energy, action, self = this;
  function dir() {
    if (!directions.contains(action.direction)) return null;
      var target = point.add(directions.lookup(action.direction));
    if (!self.grid.isInside(target)) return null;
      return target;
  }
  action = creature.act(this.listSurroundings(point));
  if (action.type == "move")
    energy = this.creatureMove(creature, point, dir());
  else if (action.type == "eat")
    energy = this.creatureEat(creature, dir());
  else if (action.type == "photosynthesize")
    energy = -1;
  else if (action.type == "reproduce")
    energy = this.creatureReproduce(creature, dir());
  else if (action.type == "wait")
    energy = 0.2;
  else
    throw new Error("Unsupported action: " + action.type);

  creature.energy -= energy;
  if (creature.energy <= 0)
    this.grid.setValueAt(point, undefined);
};

LifeLikeTerrarium.prototype.creatureMove = function(creature, from, to) {
  // /this.grid.valueAt(to) == undefined khi tại điểm đó là " "
  if (to != null || this.grid.valueAt(to) == undefined) {
    this.grid.moveValue(from, to);
    from.x = to.x; from.y = to.y;
  }
  return 1;
};

LifeLikeTerrarium.prototype.creatureEat = function(creature, source) {
  var energy = 1;
  if (source != null) {
    var meal = this.grid.valueAt(source);
    if (meal != undefined && meal.energy) {
      this.grid.setValueAt(source, undefined);
      energy -= meal.energy;
    }
  }
  return energy;
};

LifeLikeTerrarium.prototype.creatureReproduce = function(creature, target) {
  var energy = 1;
  if (target != null && this.grid.valueAt(target) == undefined) {
    var species = characterFromElement(creature);
    var baby = elementFromCharacter(species);
    energy = baby.energy * 2;
    if (creature.energy >= energy)
      this.grid.setValueAt(target, baby);
  }
  return energy;
};