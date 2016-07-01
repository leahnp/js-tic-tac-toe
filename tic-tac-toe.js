function TicTacToe() {
	this.new_game();
}

TicTacToe.prototype.new_game = function() {
	this.player = 0;
	this.game_state_obj = {
		0: [],
		1: []
	};
	this.played_tiles = {};
};

TicTacToe.prototype.player_names = function(player) {
	if (player) {
		return "Player X"
	} else {
		return "Player O"
	}
};

TicTacToe.prototype.is_winner = function(player_state) {
	var wins = [
		[1, 2, 3],
		[4, 5, 6], 
		[7, 8, 9], 
		[1, 4, 7], 
		[2, 5, 8], 
		[3, 6, 9], 
		[1, 5, 9], 
		[3, 5, 7]
	];

	// check if play wins the game
	for (var win of wins) {
		var winner = true;

		for (var id of win) {
			if (!player_state.includes(id)) {
				winner = false;
				break;
			}
		}

		if (winner) {
			return true;
		}
	}

	return false;
};

TicTacToe.prototype.game_play = function(id) {
	id = parseInt(id);

	// swap player
	this.player = this.player ? 0 : 1;

	// add play to players tally in gamestate object
	var player_state = this.game_state_obj[this.player];
	player_state.push(id);

	if (this.is_winner(player_state)) {
		// TODO send better messages
		return info = {
			'message': this.player_names(this.player) + "wins!"

			}
	}

	return info = {
		'message' : "Player 1 (black): " + this.game_state_obj[0] + 
					"<br>Player 2 (red): " + this.game_state_obj[1]
				}
};

$(document).ready(function() {
  var body = $('body');
  var display = body.children('.display');
	var buttons = body.children('button');
	var reset_button = body.children('#reset');
	var ttt = new TicTacToe();

	reset_button.on('click', function(event) {
		event.preventDefault();
		ttt.new_game();
		display.text("new game");
		buttons.css('background', 'buttonface');
		return 
	});

	buttons.on('click',  function(event) {
		event.preventDefault();
		var class_name = this.className;
		var id = this.id;

		// check if tile has already been played
		if (ttt.played_tiles[id] === 'played') {
			display.text("already played, try different tile")
			return
		};

		// add played tile to played object
		ttt.played_tiles[id] = 'played';

		// put correct play symbol on board
		if (ttt.player == 1) {
			$(this).css('background', 'red');
		} else {
			$(this).css('background', 'black');
		}

		// update game state
		var info = ttt.game_play(id);
		return display.html(info['message']);
	})
});

