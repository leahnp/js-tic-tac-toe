	function TicTacToe() {
		this.player = 1;
		this.game_state_obj = {
			1: [],
			2: []
		};
		this.win = false;
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

			// see if values are in a tie

			return  "Player 1: " + this.game_state_obj[1] + 
							"Player 2: " + this.game_state_obj[2]
		}
	};

	TicTacToe.prototype.new_game = function() {
		this.player = 1;
		this.game_state_obj = {};
		// return ttt = undefined
	}

$(document).ready(function() {
  var body = $('body');
  var display = body.children('.display')
	var buttons = body.children('button');
	var reset_button = body.children('#reset')
	console.log('chips' + reset_button)
	var ttt;

	reset_button.on('click', function(event) {
		event.preventDefault();
		ttt.new_game();
		display.text("new game")
		return 
	});

	buttons.on('click',  function(event) {
		event.preventDefault();
		var class_name = this.className;
		var id = this.id;
		// start new game if user just landed on page
		if (ttt == undefined) {
			ttt = new TicTacToe();
			// console.log('only once')
		}

		// put correct play symbol on board
		if (ttt.player == 1) {
			$(this).css('background', 'red');
		} else {
			$(this).css('background', 'black');
		}


		console.log(id);

		// update game state
		display.text(ttt.game_play(id));
	})
})
