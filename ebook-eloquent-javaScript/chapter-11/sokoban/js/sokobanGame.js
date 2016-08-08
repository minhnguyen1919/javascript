function SokobanGame(levels, place) {
  this.levels = levels;
  var newGame = dom('BUTTON', null, 'New game');
  newGame.setAttribute('class', 'btn-new-game');
  addHandler(newGame, 'click', method(this, 'newGame'));

  var reset = dom('BUTTON', null, 'Reset level');
  reset.setAttribute('class', 'btn-reset');
  addHandler(reset, 'click', method(this, 'resetLevel'));

  this.status = dom('DIV');
  this.status.setAttribute('class', 'game-info');

  this.container = dom('DIV', null, dom('H1', null, 'Sokoban'),
    dom('DIV', null, newGame, ' ', reset), this.status);
  place.appendChild(this.container);
  addHandler(document, 'keydown', method(this, 'keyDown'));
  this.newGame();
}

SokobanGame.prototype.newGame = function() {
  this.level = 0;
  this.resetLevel();
};

SokobanGame.prototype.resetLevel = function() {
  if (this.field)
    this.field.remove();

  this.field = new SokobanField(this.levels[this.level]);
  this.field.place(this.container);
  this.updateStatus();
};

SokobanGame.prototype.updateStatus = function() {
  this.status.innerHTML = 'Level ' + (1 + this.level) + ': ' +
  this.field.status();
};

var arrowKeyCodes = {
  // left
  37: new Point(-1, 0),

  // up
  38: new Point(0, -1),

  // right
  39: new Point(1, 0),

  // down
  40: new Point(0, 1)
};

SokobanGame.prototype.keyDown = function(event) {
  if (arrowKeyCodes.hasOwnProperty(event.keyCode)) {
    event.stop();
    this.field.move(arrowKeyCodes[event.keyCode]);
    this.updateStatus();

    if (this.field.won()) {
      if (this.level < this.levels.length - 1) {
        alert('Excellent! Going to the next level.');
        this.level++;
        this.resetLevel();
      }
      else {
        alert('You win! Game over.');
        this.newGame();
      }
    }
  }
};
