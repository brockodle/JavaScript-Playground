var suits = ["&#9829;", "&#9827;", "&#9824;", "&#9830;"];
var cards = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
var player_deck = [];
var ai_deck = [];

var compare_cards = function (player_card, ai_card) {
	console.log(player_card, ai_card);
	var convert_cards = function (card) {
		var pts = 0;
		if (card == "A") {
			pts = 13;
		}
		else if (card == "K") {
			pts = 12;
		}
		else if (card == "Q") {
			pts = 11;
		}
		else if (card == "J") {
			pts = 10;
		}
		else if (card == 1) {
			pts = 9
		}
		else if (card == 9) {
			pts = 8;
		}
		else if (card == 8) {
			pts = 7;
		}
		else if (card == 7) {
			pts = 6;
		}
		else if (card == 6) {
			pts = 5;
		}
		else if (card == 5) {
			pts = 4;
		}
		else if (card == 4) {
			pts = 3;
		}
		else if (card == 3) {
			pts = 2;
		}
		else if (card == 2) {
			pts = 1;
		}
		else {
			null;
		}
		return pts;
	}

	var a = convert_cards(player_card[0]);
	var b = convert_cards(ai_card[0]);

	console.log(a, b);

	if (a > b) {
		var removed = ai_deck.indexOf(ai_card);
		player_deck.push(ai_deck[removed]);
		ai_deck.splice(removed, 1);
		alert("Player wins!");
	}
	else if (b > a) {
		var removed = player_deck.indexOf(player_card);
		ai_deck.push(player_deck[removed]);
		player_deck.splice(removed, 1);
		alert("AI wins!");
	}
	else if (a == b) {
		alert("War!");
	}
	$("body").empty();
	war_run(player_deck, ai_deck);
}

var war_run = function (player, ai) {

	var player_pick = Math.round(Math.random() * player_deck.length);
	var ai_pick = Math.round(Math.random() * ai_deck.length);

	console.log("player length:" + player.length, "ai length:" + ai.length);
	console.log("Player:" + player_pick, "AI:" + ai_pick);

	var checklist = function (ppick, apick) {
		ppick = parseInt(ppick);
		apick = parseInt(apick);
		console.log(ppick,apick);
		console.log("checklist fired");
		if (ppick < 0) {
			console.log("checklist used, smaller than zero");
			player_pick = Math.round(Math.random() * player_deck.length);
			return player_pick;
		}
		else if (ppick > player.length) {
			console.log("checklist used, larger than length");
			player_pick = Math.round(Math.random() * player_deck.length);
			return player_pick;
		}
		else if (ppick == player.length){
			return;
		}
		else {
			return;
		}
		if (apick < 0) {
			console.log("checklist used, smaller than zero");
			ai_pick = Math.round(Math.random() * ai_deck.length);
			return ai_pick;
		}
		else if (apick > ai_pick.length) {
			console.log("checklist used, larger than length");
			player_pick = Math.round(Math.random() * player_deck.length);
			return ai_pick;
		}
		else if (apick == ai.length){
			return;
		}
		else {
			return;
		}
		checklist(player_pick, ai_pick);
	}

	checklist(player_pick, ai_pick);

	var a_pick = player_deck[player_pick];
	var b_pick = ai_deck[ai_pick];

	var drawP = $("<div>")
		.attr("class", "cards")
		.html(a_pick)
		.click(function () {
			compare_cards(a_pick, b_pick);
		})
		.appendTo("body");

	var drawA = $("<div>")
		.attr("class", "cards")
		.html(b_pick)
		.click(function () {
			compare_cards(a_pick, b_pick);
		})
		.appendTo("body");
}

var disp_decks = function () {
	player_deck = ai_deck.splice(0, Math.floor(ai_deck.length / 2));
	war_run(player_deck, ai_deck);
}

var deck_run = function () {
	for (var shuff in ai_deck) {
		var cards = $("<div>")
			.attr("class", "cards")
			.html(ai_deck[shuff])
			.appendTo("body");
	}
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

var deck = function () {
	for (var nums in cards) {
		var each_card = cards[nums];
		for (var suit_types in suits) {
			ai_deck.push(cards[nums] + suits[suit_types]);
		}
	}
	shuffle(ai_deck);
	disp_decks();
}