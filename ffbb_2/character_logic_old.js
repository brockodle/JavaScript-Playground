/* NEXT UP:
- Continuing supplying "skills" for each indiv. character from JSON
- add DEFid & ATKid to each JSON char
- Finish up stats for characters, next in line:
	- CARL DEF
	- BELL ATK & DEF
	- JACK ATK & DEF
- start logic of ATK balances (ie baseDMG,cost,crits)
- implement DEF balances (ie baseBUFF,cost)
*/

var userChar = "";
var userAtk = [];
var userDef = [];
var def_count = 0;
var atk_count = 0;

var getRandomElementFrom = function (obj) {
	var keys = Object.keys(obj);
	return obj[keys[keys.length * Math.random() << 0]];
}

var char_select = function () {
	var char_attacks = function (atk) {
		console.log(atk);
	}
	var battle = function () {
		$(".app_shell").empty();
		var character = $("<div>")
			.attr("class", "char_portrait")
			.appendTo(".app_shell");

		var headerA = $("<div>")
			.attr("class", "headerA")
			.text("Attack")
			.click(function () {
				atk_count++;
				if (atk_count % 2) {
					defenses.fadeOut(150);
					$(this).parent().children().not(this).slideDown(150);
				}
				else {
					$(this).parent().children().not(this).slideUp(150);
					defenses.fadeIn(150);
				}
			});

		var headerD = $("<div>")
			.attr("class", "headerD")
			.text("Defense")
			.click(function () {
				def_count++;
				if (def_count % 2) {
					attacks.fadeOut(150);
					$(this).parent().children().not(this).slideDown(150);
				}
				else {
					$(this).parent().children().not(this).slideUp(150);
					attacks.fadeIn(150);
				}
			});

		var attacks = $("<div>")
			.attr("class", "attacks")
			.append(headerA)
			.appendTo(".app_shell");

		var defenses = $("<div>")
			.attr("class", "defenses")
			.append(headerD)
			.appendTo(".app_shell")

		$.getJSON("characters.json", function (json) {
			var char_detail = function (char_pick) {
				userChar = allcharacters[char_pick];
				var atk = userChar.attack;
				var def = userChar.defense;
				/* ATK stats read as follows: [baseDMG,stamina cost, % for critical chance] */
				/* DEF stats read as follows: [baseBUFF,stamina cost] */
				battle();
				for (var attacks in atk) {
					var atk_all = atk[attacks];
					console.log(atk_all.name);
					char_attacks(atk_all);
					var skills = $("<div>")
						.attr("class", "half_btn")
						.attr("id", atk_all.id)
						.text(atk_all.name)
						.appendTo($(".attacks"))
						.hide();
				}
				for (var defenses in def) {
					var def_all = def[defenses];
					console.log(def_all.name);
					char_attacks(def_all);
					var skills = $("<div>")
						.attr("class", "half_btn")
						.attr("id", def_all.id)
						.text(def_all.name)
						.appendTo($(".defenses"))
						.hide();
				}
			}
			var allcharacters = json.characters;
			var eachid = allcharacters.charId;
		})
	}
	var main_menu = function () {
		$('body').empty();
		$('body').append("<div class='app_shell'><div class='title'>Fast Food Bar Brawl</div><div id='play' class='wide_btn'>Play</div><div id='instructions' class='wide_btn'>How to Play</div></div>");
		$('#play').click(function () {
			char_select();
		});
	}
}