var score = 0;
var score_tot = 0;
var op_score = 0;
var time_pick = 0;

var results = function () {
        $("#clock").remove();
        console.log("results triggered");
        $("body").empty();
        $("body").append("<div class='app_shell'></div>");
        $('.app_shell').append("<div class='title_logo'>Time's Up!</div>");
        $("<div>")
                .attr("class", "desc_box")
                .html("Your Score: " + score_tot + "<br/>Your opponent: " + op_score)
                .appendTo(".app_shell");
}

var gotoEnd = function () {
        results();
}

//var x = ($("#location"))
//function showPosition(position) {
//        x.text("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
//        console.log(position.coords.latitude, position.coords.longitude);
//}
//function getLocation() {
//        if (navigator.geolocation) {
//                navigator.geolocation.getCurrentPosition(showPosition);
//        }
//        else {
//                x.text("Geolocation is not supported by this browser.");
//        }
//}
//getLocation();

var main_menu = function () {
        var to_instructions = function () {
                $("body").empty();
                var app_shell = $("<div>")
                        .attr("class", "app_shell");

                var instructions = $("<div>")
                        .attr("class", "list_item")
                        .html("<h3>Instructions</h3><p>See how long it takes to creep people out!<br/><br/>Cheevo Scavenger is a simple scavenger hunt game to play with friends. Grab more cheevos than your friends! Just tap the person you see matching the description on your list.<br/><br/>Tell us where you are in the world and play!</strong></p><p>Thank you for playing!<br/><br/>- Brock and Malcolm<br/>&nbsp;&nbsp;Cheevo Scavenger Dev Team</p>")
                        .appendTo(app_shell);

                app_shell.appendTo("body");
        }
        var to_options = function () {

        }
        var to_places = function () {

                var ary = [];
                $('.app_shell').remove();
                $('#loc_1,#loc_2,#loc_3,#loc_4').hide();
                ary = [($('#loc_1')), ($('#loc_2')), ($('#loc_3')), ($('#loc_4'))];
                anim_in(ary, null);

                var app_shell = $("<div>")
                        .attr("class", "app_shell")
                        .appendTo("body");

                var title = $("<div>")
                        .attr("class", "title_logo")
                        .text("Cheevo Scavenger")
                        .appendTo(app_shell);

                var location1 = $("<div>")
                        .attr("id", "loc_1")
                        .attr("class", "score")
                        .text("mall")
                        .appendTo(app_shell);

                var location2 = $("<div>")
                        .attr("id", "loc_2")
                        .attr("class", "score")
                        .text("the park")
                        .appendTo(app_shell);

                var location3 = $("<div>")
                        .attr("id", "loc_3")
                        .attr("class", "score")
                        .text("theme park")
                        .appendTo(app_shell);

                var location4 = $("<div>")
                        .attr("id", "loc_4")
                        .attr("class", "score")
                        .text("road trip")
                        .appendTo(app_shell);

                $('.score').click(function () {
                        anim_out(ary, player_pg($(this).text()));
                });

        }

        var app_shell = $("<div>")
                .attr("class", "app_shell");

        var title = $("<div>")
                .attr("class", "title_logo")
                .text("Cheevo Scavenger")
                .appendTo(app_shell);

        var play = $("<div>")
                .attr("id", "play_btn")
                .attr("class", "point")
                .text("Play!")
                .appendTo(app_shell);

        var instr = $("<div>")
                .attr("id", "instructions_btn")
                .attr("class", "point")
                .text("Instructions")
                .appendTo(app_shell);

        var options = $("<div>")
                .attr("id", "options_btn")
                .attr("class", "point")
                .text("Options")
                .appendTo(app_shell);

        app_shell.appendTo("body");

        $('#play_btn').click(function () {
                var ary = [($('#play_btn')), ($('#instructions_btn')), ($('#options_btn'))];
                anim_out(ary, to_places);
        });

        $('#instructions_btn').click(function () {
                var ary = [($('#play_btn')), ($('#instructions_btn')), ($('#options_btn'))];
                anim_out(ary, to_instructions);
        });

        $('#options_btn').click(function () {
                var ary = [($('#play_btn')), ($('#instructions_btn')), ($('#options_btn'))];
                anim_out(ary, to_options);
        });
}
main_menu();

var begin_time = function (chosen_time) {
        var col_text = function (time) {
                if (time > 65) {
                        $('#clock').css({ 'background-color': 'darkgreen' });
                }
                else if (time > 30) {
                        $('#clock').css({ 'background-color': 'peru' });
                }
                else if (time > 0) {
                        $('#clock').css({ 'background-color': 'maroon' });
                }
                else {
                        gotoEnd();
                }
        }
        function startTimer(duration, display) {
                var timer = duration, minutes, seconds;
                setInterval(function () {
                        var disp = Math.round(100 * (timer / duration));
                        console.log(disp);
                        col_text(disp);
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;
                        display.text(minutes + ":" + seconds);
                        col_text(disp);
                        if (--timer < 0) {
                                timer = 0, 0, 0;
                                minutes = 0;
                                seconds = 0;
                                setInterval(0);
                                return;
                        }
                }, 1000);
        }

        jQuery(function ($) {
                var ten = 60 * chosen_time, display = $('#clock'); startTimer(ten, display);
        });
}

var game_pg = function (time) {
        $('.app_shell').remove();
        $('body').append('<div class = "app_shell"><div id = "clock"></div><div class = "score">Score: ' + score + '<br/></div><div id = "list" align="center"></div></div><div id = "json_list"></div>');
        begin_time(time);
}

var player_pg = function (loc) {
        var desc_dic = { "mall": "Welcome to the Mall! The place where people go to lose money that they don't actually make! Click the start button below to begin!<br/><br/><span style=\"font-size:0.7em\">Choose your start time below. The timer will begin as soon as you press start! Try to beat your friends and spot more cheevos than them!</span>", "park": "a place to do stuff" };
        $('.app_shell').remove();
        $('body').append('<div class = "app_shell"><div id = "' + loc + '_desc" class = "desc_box" style = "height:auto;border-radius:10px;margin:0 auto;">' + desc_dic[loc] + '<div class = "timeList" onclick="time_pick=0.25;">15 seconds</div><div class = "timeList" onclick="time_pick=15;">15 minutes</div><div class = "timeList" onclick="time_pick=20;">20 minutes</div><div class = "timeList" onclick="time_pick=30;">30 minutes</div><div class="timeList" onclick="time_pick=60;">1 hour</div></div></div>');
        $('.point').hide();
        $('.timeList').click(function (time) {
                time = time_pick;
                $('.timeList').hide();
                $('.desc_box').append('<div class = "point" style="margin:2% auto;height:auto;" onclick="game_pg(\'' + time + '\');location_select(\'' + loc + '\');" >Start</div>');
                $('.point').show();
        });
}

// got this from Stack Overflow
var getRandomElementFrom = function (obj) {
        var keys = Object.keys(obj);
        return obj[keys[keys.length * Math.random() << 0]];
}

var location_select = function (location) {
        if (location == "mall") {
                $.getJSON("mall.json", function (json) {
                        var allAchievements = json.achievements;
                        for (var achievementId in allAchievements) {
                                var achievement = allAchievements[achievementId];
                                console.log(achievement.title + ": " + achievement.description + ", " + achievement.points);
                        }
                        var item_check = function (curr) {
                                console.log(activeAchievements);
                                console.log(curr);
                                for (var i = 0; i <= activeAchievements.length; i++) {
                                        if (curr === activeAchievements[i]) {
                                                console.log("double found");
                                                randomAchievement = getRandomElementFrom(allAchievements);
                                                cheevo = $("<div>")
                                                        .attr("class", "list_item")
                                                        .text(randomAchievement.title);
                                                item_check(cheevo.text());
                                        }
                                        else {
                                                null;
                                        }
                                }
                        }
                        console.log("done reading json");

                        // no need to create multiple arrays. just reference everything straight out of the returned json

                        var activeAchievements = [];
                        for (var j = 0; j < 5; j++) { // in programming, it's common to start counting at 0 :)
                                var new_cheevo = function (old_cheevo, title) {
                                        var item_check = function (curr) {
                                                console.log(activeAchievements);
                                                console.log(curr);
                                                for (var i = 0; i <= activeAchievements.length; i++) {
                                                        if (curr === activeAchievements[i]) {
                                                                console.log("double found");
                                                                randomAchievement = getRandomElementFrom(allAchievements);
                                                                cheevo = $("<div>")
                                                                        .attr("class", "list_item")
                                                                        .text(randomAchievement.title);
                                                                item_check(cheevo.text());
                                                        }
                                                        else {
                                                                null;
                                                        }
                                                }
                                        }
                                        old_cheevo.animate({ "width": "95%" }, 200).fadeOut(200, function () {
                                                console.log(title);
                                                old_cheevo.remove();
                                                console.log("new item trigger");
                                                randomAchievement = getRandomElementFrom(allAchievements);
                                                activeAchievements.push(randomAchievement.title);
                                                var renew = function () {
                                                        cheevo = $("<div>")
                                                                .animate({ "width": "80%" }, 200)
                                                                .animate({ "width": "90%" }, 200)
                                                                .fadeIn(200)
                                                                .attr("class", "list_item")
                                                                .text(randomAchievement.title);
                                                        item_check(cheevo.text());

                                                        var desc = $("<div>")
                                                                .attr("class", "desc_box")
                                                                .text(randomAchievement.description)
                                                                .hide()
                                                                .appendTo(cheevo);

                                                        var desc_vid = $("<div>")
                                                                .attr("class", "content_box")
                                                                .html(randomAchievement.vid)
                                                                .hide()
                                                                .appendTo(cheevo);

                                                        var points = $("<div>")
                                                                .attr("class", "point")
                                                                .text(randomAchievement.points)
                                                                .hide()
                                                                .appendTo(cheevo);
                                                        cheevo.click(function () {
                                                                $(".list_item").not(this).children().slideUp(200);
                                                                $(this)
                                                                        .children().slideToggle(200)
                                                                        .find(".desc_box,.content_box")
                                                        });
                                                        points.click(function () {
                                                                var points = parseInt($(this).text());
                                                                console.log(points);
                                                                score_tot += points;
                                                                // keep clicking and you get infinite points. that's a bug to fix I guess
                                                                $(".score").text("Score: " + score_tot);
                                                                new_cheevo($(this).parent(), randomAchievement.title);
                                                                return false;
                                                        });
                                                }
                                                renew();
                                                cheevo.appendTo("#list");
                                        });
                                }
                                var randomAchievement = getRandomElementFrom(allAchievements);
                                // just realised all my indentation is off. sorry, that's very bad form
                                // anyway you could do all this in just one JQuery call but I separated it out for clarity

                                var cheevo = $("<div>")
                                        .attr("class", "list_item")
                                        .text(randomAchievement.title);
                                item_check(cheevo.text());
                                activeAchievements.push(randomAchievement.title);

                                var desc = $("<div>")
                                        .attr("class", "desc_box")
                                        .text(randomAchievement.description)
                                        .hide()
                                        .appendTo(cheevo);

                                var desc_vid = $("<div>")
                                        .attr("class", "content_box")
                                        .html(randomAchievement.vid)
                                        .hide()
                                        .appendTo(cheevo);

                                var points = $("<div>")
                                        .attr("class", "point")
                                        .text(randomAchievement.points)
                                        .hide()
                                        .appendTo(cheevo);
                                // Maybe you want this appended to the desc instead, I don't know how you want it

                                cheevo.click(function () {
                                        $(".list_item").not(this).children().slideUp(200);
                                        $(this)
                                                .children().slideToggle(200)
                                                .find(".desc_box,.content_box");
                                });
                                points.click(function () {
                                        var points = parseInt($(this).text());
                                        console.log(points);
                                        score_tot += points;
                                        // keep clicking and you get infinite points. that's a bug to fix I guess
                                        $(".score").text("Score: " + score_tot);
                                        new_cheevo($(this).parent(), randomAchievement.title);
                                        return false;
                                        // necessary to prevent click from falling through and triggering elements behind
                                });
                                cheevo.appendTo("#list");
                        }
                });
        }
        else if (location == "park") {

        }
        var back = $("<div>")
                .attr("class", "back")
                .text("TEST TEXT")
                .html("<img src=\"images/back_btn.png\" onclick='main_menu();' />")
                .appendTo("body");
}
// I noticed you also set CSS for each list_ id. A better idea is to give them unique lists,
// but the same class - e.g. ".listElement" or something. Then just set the CSS for
// .listElement and not the individual IDs.
// That way you don't run into bugs like the one I just made, where because I start counting
// at 0, the first element does not get styled.

// Also one more tip - when testing this I discovered that Firefox doesn't care if you load
// JSON from your local machine, when testing locally.

//