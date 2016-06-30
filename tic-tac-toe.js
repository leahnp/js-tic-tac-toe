	function TicTacToe() {
		this.player = 2;
		this.game_state_obj = {
			1: [],
			2: []
		};
		this.played_tiles = {};
		// this.win = false;
	};

	TicTacToe.prototype.game_play = function(id) {
		// swap player
		if (this.player == 1) {
			this.player = 2;
		} else {
			this.player = 1;
		};
		// console.log("player " + this.player)

		// add play to players tally in gamestate object
		// var plays = this.game_state_obj[this.player]
		this.game_state_obj[this.player].push(parseInt(id));
		console.log(this.game_state_obj[this.player]);

		var wins = {
			0: [1, 2, 3],
			1: [4, 5, 6], 
			2: [7, 8, 9], 
			3: [1, 4, 7], 
			4: [2, 5, 8], 
			5: [3, 6, 9], 
			6: [1, 5, 9], 
			7: [3, 5, 7]
		};

		// iterate through wins object to find winner
		for (var win in wins) {
			// console.log(win)
			// see if value array elements are included in players plays
			if (this.game_state_obj[this.player].includes(wins[win][0, 1, 2])) {
				this.new_game();
				return 'won'
				// need to pass the real winner to statement - this is just player2 everytime
				return "Player" + this.player + "wins!" + JSON.stringify(this.game_state_obj) + JSON.stringify(this.played_tiles)
			};
		};

		return  "Player 1 (black): " + this.game_state_obj[1] + 
						"<br>Player 2 (red): " + this.game_state_obj[2];
	};

	TicTacToe.prototype.new_game = function() {
		this.player = 2;
		this.game_state_obj = {
			1: [],
			2: []
		};
		this.played_tiles = {};
	}


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
		// console.log(id);

		// update game state
		// I know the html is bad. 
		var returnInfo = ttt.game_play(id);
		if (returnInfo == 'won') {
			// reset vars then reset buttons
			// returnInfo = ttt.player + " player has won!"
			// ttt.new_game();
			// reset_button.on();
		}
		console.log(returnInfo);
		return display.html(returnInfo);
	})
})
		// start new game if user just landed on page
		// if (ttt == undefined) {
		// 	ttt = new TicTacToe();
		// }
