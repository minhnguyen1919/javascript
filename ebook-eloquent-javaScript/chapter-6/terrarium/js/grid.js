    function Grid(width, height){
      this.width = width;
      this.height =  height;
      this.cells = new Array(width * height); 
    }

    Grid.prototype.valueAt = function(point){
      return this.cells[point.y + point.x * this.width];
    }

    Grid.prototype.setValueAt = function(point, value){
      this.cells[point.y + point.x * this.width] = value;
    }

    Grid.prototype.isInside = function(point){
      return point.x > 0 && point.x < this.width && 
      point.y > 0 && point.y < this.height;
    }

    Grid.prototype.moveValue = function(from, to) {
      this.setValueAt(to, this.valueAt(from));
      this.setValueAt(from, undefined);
    };

    Grid.prototype.each = function(action){
      for (var y = 0; y < this.height; y++) {
        for(var x = 0; x< this.width; x++){
          var point = new Point(x,y);
          action(point, this.valueAt(point));
        }
      }
    };