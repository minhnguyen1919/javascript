function SokobanField(level) {
  this.fieldDiv = dom('DIV');
  this.fieldDiv.setAttribute('class', 'sokoban-game');
  this.squares = [];
  this.bouldersToGo = level.boulders;

  for (var y = 0; y < level.field.length; y++) {
    var line = level.field[y];
    var squareRow = [];

    for (var x = 0; x < line.length; x++) {
      var img = dom('IMG');
      this.fieldDiv.appendChild(img);
      squareRow.push(new Square(line.charAt(x), img));

      if (line.charAt(x) == '@')
        this.playerPos = new Point(x, y);

    }

    this.fieldDiv.appendChild(dom('BR'));
    this.squares.push(squareRow);
  }
}

SokobanField.prototype.status = function() {
  return this.bouldersToGo + ' boulder' +
  (this.bouldersToGo == 1 ? '' : 's') + ' to go.';
};

SokobanField.prototype.won = function() {
  return this.bouldersToGo <= 0;
};

SokobanField.prototype.place = function(where) {
  where.appendChild(this.fieldDiv);
};

SokobanField.prototype.remove = function() {
  this.fieldDiv.parentNode.removeChild(this.fieldDiv);
};

SokobanField.prototype.move = function(direction) {
  var playerSquare = this.squares[this.playerPos.y][this.playerPos.x];
  var targetPos = this.playerPos.add(direction);
  var targetSquare = this.squares[targetPos.y][targetPos.x];

  // First, see if the player can push a boulder...
  if (targetSquare.content == 'boulder') {
    // position of future place of boulder
    var pushPos = targetPos.add(direction);
    var pushSquare = this.squares[pushPos.y][pushPos.x];

    if (pushSquare.content == 'empty') {
      // future place of boulder is empty
      targetSquare.setContent('empty');
      pushSquare.setContent('boulder');
    }
    else if (pushSquare.content == 'exit') {
      targetSquare.setContent('empty');
      this.bouldersToGo--;
    }
  }

  // Then, try to move...
  if (targetSquare.content == 'empty') {
    playerSquare.setContent('empty');
    targetSquare.setContent('player');
    this.playerPos = targetPos;
  }
};
