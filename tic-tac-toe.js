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
			0: [],
			1: []
		};
		// this._callback = callback;
	};

	TicTacToe.prototype.game_play = function(id) {
		// swap player
		if (this.player == 1) {
			this.player = 0;
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
			0: [4, 5, 6], 
			0: [7, 8, 9], 

			0: [1, 4, 7], 
			0: [2, 5, 8], 
			0: [3, 6, 9], 

			0: [1, 5, 9], 
			0: [3, 5, 7]
		}

	};

	TicTacToe.prototype.new_game = function() {
		this.player = 1;
		this.game_state_obj = {};
	}

$(document).ready(function() {
  var body = $('body');
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
		ttt.game_play(id)
	})

	// function TicTacToe() {

	// }



})
