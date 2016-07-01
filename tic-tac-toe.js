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

	// check for tie
	if (Object.keys(this.played_tiles).length == 9) {
			return info = {
									'message': "It's a tie."
									}
	}

	// check for a win
	if (this.is_winner(player_state)) {
		// make it so people cannot keep playing
		this.played_tiles = {
			1: 'played',
			2: 'played',
			3: 'played',
			4: 'played',
			5: 'played',
			6: 'played',
			7: 'played',
			8: 'played',
			9: 'played'
		};
		return info = {
									'message': this.player_names(this.player) + " wins!"
									};
	}

	return info = {
									'message': "Nice play, buddy."
									}
};

$(document).ready(function() {
  var body = $('body');
  var display = body.children('.display');
	var buttons = body.children('button');
	var reset_button = body.children('#reset');
	var ttt = new TicTacToe();


	body.on('mousemove', function(event) {
	  // console.log(event);
	  var x = event.clientX;
	  var y = event.clientY;
	  body.textContent = x + ', ' + y;
	  body.css('background', 'rgb(' + x + ', ' + y + ', 100)')
	});


	reset_button.on('click', function(event) {
		event.preventDefault();
		ttt.new_game();
		display.text("New Game");
		buttons.css('background', 'buttonface');
		return 
	});

	buttons.on('click',  function(event) {
		event.preventDefault();
		var class_name = this.className;
		var id = this.id;

		// check if tile has already been played
		if (ttt.played_tiles[id] === 'played') {
			display.text("Already played, try different tile.")
			return
		};

		// add played tile to played object
		ttt.played_tiles[id] = 'played';

		// put correct play symbol on board
		if (ttt.player == 1) {
			$(this).css('background', 'grey');
		} else {
			$(this).css('background', 'black');
		}

		// update game state
		var info = ttt.game_play(id);
		return display.html(info['message']);
	})
});