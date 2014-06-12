(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
  
  var TowersUI = Hanoi.TowersUI = function(game, $towers) {
    this.game = game;
    this.$towers = $towers;
    this.sourcePile = null;
    this.destPile = null;
  };
  
  TowersUI.prototype.bindTowers = function() {
    var that = this;
    this.$towers.on("click", ".pile", function(){
      if(that.sourcePile != null) {
        that.destPile = $(this).index();
        
        //See if the move is possible from sourcePile to destPile.
        that.makeMove();
        that.resetTurn();
        that.render();
        
        if (that.game.isWon()) {
          $('.alert').html("You won!");
          that.game = new Hanoi.Game();
          that.render();
        }
      } else {
        that.sourcePile = $(this).index();
        $(this).addClass('highlighted');
      }
    });
  };
  
  TowersUI.prototype.makeMove = function() {
    if(this.game.move(this.sourcePile, this.destPile)){
      $('.alert').html("Successful move.");
    } else {
      $('.alert').html("Invalid move. Try again.");
    }
  };
  
  TowersUI.prototype.resetTurn = function() {
    this.sourcePile = null;
    this.destPile = null;
    $(".pile").removeClass('highlighted');
  };
  
  TowersUI.prototype.render = function() {
    var $piles = $(".pile");
    var that = this;
    $piles.each(function(index) {
      var html = "";
      for (var i =  that.game.towers[index].length - 1; i >= 0; i--) {
        var disc = that.game.towers[index][i];
        if(disc === 1) {
         html += "<div class='disc disc-small'></div>";
        } else if (disc === 2) {
         html += "<div class='disc disc-medium'></div>";
        } else if (disc === 3) {
         html += "<div class='disc disc-large'></div>";
        }
      }
      $(this).html(html);
    });
  }
  
  TowersUI.prototype.run = function() {
    this.bindTowers();
    this.render();
  };

  
  
})(this);