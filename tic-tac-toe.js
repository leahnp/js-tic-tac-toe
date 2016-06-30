// turn concept
// whose turn is it? keep track of rounds
// select a space/is it availablle
// check win (define win)/loss(define loss)/draw state(define tie)
// draw outcome

// player 1 = x
// player 0 = o

// obj = { 0: [1,2,3] 1: [4,5,6]}

	function TicTacToe() {
		this.player = 1;
		this.game_state_obj = {
			1: [],
			2: []
		};
		this.win = false;
		// this._callback = callback;
	};

	TicTacToe.prototype.game_play = function(id) {
		// swap player
		if (this.player == 1) {
			this.player = 2;
		} else {
			this.player = 1;
		};
		console.log("player " + this.player)

		// add play to players tally in gamestate object
		var plays = this.game_state_obj[this.player]
		plays.push(parseInt(id));
		console.log(plays)

		var wins = {
			0: [1, 2, 3],
			1: [4, 5, 6], 
			2: [7, 8, 9], 

			3: [1, 4, 7], 
			4: [2, 5, 8], 
			5: [3, 6, 9], 

			6: [1, 5, 9], 
			7: [3, 5, 7]
		}

		// iterate through wins object to find winner
		for (var win in wins) {
			// see if value array elements are included in players plays
			if (plays.includes(wins[win][0, 1, 2])) {
				console.log(this.player + " is the winner!");
				this.win = true;
				this.new_game();
				return "Player" + this.player + "wins!"
			}
			return  "Player 1: " + this.game_state_obj[1] + 
							"Player 2: " + this.game_state_obj[2]
		}

	};

	TicTacToe.prototype.new_game = function() {
		this.player = 1;
		this.game_state_obj = {};
	}

$(document).ready(function() {
  var body = $('body');
  var display = body.children('.display')
	var buttons = body.children('button');
	var ttt;

	buttons.on('click',  function(event) {
		event.preventDefault();
		var class_name = this.className;
		var id = this.id;
		// start new game if user just landed on page
		if (ttt == undefined) {
			ttt = new TicTacToe();
			// console.log('only once')
		}

		// if reset button, start new game
		if (id == 'reset') {
			ttt.new_game();
		}

		console.log(id);
		// console.log('player' + ttt.player);

		// update game state
		display.text(ttt.game_play(id));
	})

	// function TicTacToe() {

	// }



})
