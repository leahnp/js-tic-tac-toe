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
	// id = parseInt(id);

	// swap player
	this.player = this.player ? 0 : 1;
	// if (this.player == 1) {
	// 	this.player = 2;
	// } else {
	// 	this.player = 1;
	// }

	// add play to players tally in gamestate object
	var player_state = this.game_state_obj[this.player];
	player_state.push(parseInt(id));
	console.log(player_state);

	// iterate through wins object to find winner
	if (this.is_winner(player_state)) {
		// need to pass the real winner to statement - this is just player2 everytime
		return "Player" + this.player + "wins!" + JSON.stringify(this.game_state_obj) + JSON.stringify(this.played_tiles);
	}

	return "Player 1 (black): " + this.game_state_obj[0] + 
					"<br>Player 2 (red): " + this.game_state_obj[1];
};

$(document).ready(function() {
  var body = $('body');
  var display = body.children('.display');
	var buttons = body.children('button');
	var reset_button = body.children('#reset');

	var ttt = new TicTacToe();

	reset_button.on('click', function(event) {
		event.preventDefault();
		// reset game vars
		ttt.new_game();
		// udpate game text
		display.text("new game");
		// reset button faces
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
		// I know the html is bad. 
		var message = ttt.game_play(id);
		return display.html(message);
	})
});

