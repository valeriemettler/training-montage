var Player = function (playername, playerscore) {
  this.playername = playername;
  this.playerscore = 0;
};

Player.prototype.getPlayername = function () {
  console.log("The player is " + this.playername);
};

Player.prototype.getPlayerscore = function () {
  console.log( this.playername + "'s score is " + this.playerscore);
};

Player.prototype.incrementPlayerscore = function () { 
  this.playerscore += 1;
}

var player1 = new Player("Valerie");
console.log("player1 ", player1);
player1.getPlayername();
player1.getPlayerscore();

var player2 = new Player("Valerie's opponent");
console.log("player2 ", player2);
player2.getPlayername();
player2.getPlayerscore();

player1.incrementPlayerscore();
player1.getPlayerscore();
player2.getPlayerscore();
