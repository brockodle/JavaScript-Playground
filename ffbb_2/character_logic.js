
/* NEXT UP:
- start logic of ATK balances (ie baseDMG, STAM COST, CRITS)
- implement DEF balances (ie baseBUFF,cost)
*/

var userChar = "";
var health_base = 400;
var stamina_base = 100;
var p_health = 0;
var p_health_curr = 0;
var p_stamina = 0;
var p_stamina_curr = 0;
var e_health = 0;
var e_health_curr = 0;
var e_stamina = 0;
var e_stamina_curr = 0;
var userAtk = [];
var userDef = [];
var def_count = 0;
var atk_count = 0;
var shell = $("<div>")
    .attr("class", "app_shell");
var spd = 0;
var str = 0;
var sta = 0;
var mag = 0;
var dex = 0;
var ai_spd = 0;
var ai_str = 0;
var ai_sta = 0;
var ai_mag = 0;
var ai_dex = 0;
var curr_track = "";
var clickcounter = 0;
var punches = ["sound/punch01.mp3", "sound/punch02.mp3", "sound/punch03.mp3", "sound/punch04.mp3", "sound/punch05.mp3"];

var scale_col = function (wid) {
    if (wid > 65) {
        return "green";
    }
    else if (wid > 40) {
        return "orange";
    }
    else {
        return "maroon";
    }
}

var deathstroke = function (affected_div) {
    affected_div.css({ "position": "relative" })
    affected_div.animate({ "top": 50 }, 50).animate({ "top": -10 }, 50).animate({ "top": 0 }, 50);
}

var shake_stambar = function (div) {
    div.css({ "position": "relative" })
    div.animate({ "top": 50 }, 50).animate({ "top": -10 }, 50).animate({ "top": 0 }, 50);
    return;
}

var get_health = function (div, curr, total) {
    console.log("Player: " + p_health, p_health_curr, "Opponent: " + e_health, e_health_curr);
    var widthvar = div.width();
    var display = Math.round((curr / total) * widthvar);
    div.animate({ "width": display }, 300);
    if (display <= 0) {
        if (div.parent().attr("id") === "player") {
            null;
        }
        else if(div.parent().attr("id") === "enemy") {
            div.fadeOut(200);
        }
    }
    else {
        null;
    }
    div.children().text(curr);
    return;
}

var rand_punch = function () {
    var ppick = Math.round(Math.random() * punches.length);
    var check = function () {
        if (ppick > 4) {
            ppick = Math.round(Math.random() * punches.length);
        }
        else {
            return;
        }
    }
    check();
    var punch = new Audio(punches[ppick]);
    punch.normalize();
    punch.volume = 0.2;
    punch.play();
    return;
}

var get_stamina = function (div, curr, total) {
    var widthvar = div.width();
    var display = Math.round((curr / total) * widthvar);
    div.animate({ "width": display }, 300);
    if (display <= 0) {
        div.fadeOut(200);
    }
    else {
        null;
    }
    div.children().text(curr);
    return;
}

var buff_ai = function (defense) {

}

var buff_player = function (defense) {

}

var dealto_ai = function (div, attack, stamcost) {
    e_health_curr = e_health_curr - attack;
    get_health(div, e_health_curr, e_health);
    e_health = e_health_curr;
    get_stamina($("#player .scale_stashl"), p_stamina_curr, p_stamina);
    p_stamina = p_stamina_curr;
    checkhealth($("#enemy"), e_health, enemy);
    turn_check();
}

var dealto_player = function (div, attack, stamcost) {
    p_health_curr = p_health_curr - attack;
    get_health(div, p_health_curr, p_health);
    p_health = p_health_curr;
    get_stamina($("#enemy .scale_stashl"), e_stamina_curr, e_stamina);
    e_stamina = e_stamina_curr;
    turn_check();
}

var getRandomElementFrom = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

var determine_attack = function (opponent_div, attack_ary, stam_result) {
    var array = attack_ary.ary;
    var base_atk = array[0];
    var crit_hit = array[1];
    var crit_chance = array[2];

    var atk_result = 0;
    var rando_num = Math.round(Math.random() * 100);
    if (rando_num <= crit_chance) {
        atk_result = base_atk + crit_hit;
        console.log("CRITICAL : " + rando_num + "%");
    }
    else {
        atk_result = base_atk;
        console.log("REGULAR : " + rando_num + "%");
    }
    var stamina_take = p_stamina_curr - stam_result;
    p_stamina_curr = stamina_take;
    dealto_ai(opponent_div, atk_result, stamina_take);
}

var determine_defense = function (your_div, def_ary, stam_result) {
    console.log(your_div, def_ary, stam_result);
    var array = def_ary.ary;
    var base_buff = array[0];
    var stam_cost = array[1];
    var buff_total = base_buff + (Math.round(sta * 1.5));
    var stamina_take = stam_cost;
    p_health_curr += buff_total;
    p_stamina_curr -= stamina_take;
    console.log(buff_total);
    get_health($("#player .scale_shell"), p_health_curr, p_health)
    get_stamina($("#player .scale_stashl"), p_stamina_curr, p_stamina);
    atk_count++;
    turn_check();
}

var checkhealth = function (div, health, func) {
    if (health <= 0) {
        div.remove();
        func();
    }
    else if (health >= 1) {
        null;
    }
};

var enemy_atk = function (strength) {
    var atk_base = strength * 60;
    var atk_total = 0;
    var crit = function () {
        if (roll = 1) {
            return 20;
        }
        else if (roll = 2) {
            return 35;
        }
    }
    var atk_chance = Math.round(Math.random() * 100)
    if (atk_chance <= crit()) {
        atk_total = atk_base + (strength * 40);
        dealto_player($("#player .scale_shell"), atk_total, null);
    }
    else {
        atk_total = atk_base;
        dealto_player($("#player .scale_shell"), atk_total, null);
    }
}

var enemy = function () {

    $.getJSON("enemies.json", function (ai) {

        var low = ai.low;
        var med = ai.med;
        var roll = Math.round(Math.random() * 2)
        var e_pick = function (e) {

            var stats = e.stats;

            var e_box = $("<div>")
                .attr("class", "char_btn")
                .attr("id", "enemy")
                .appendTo(shell);

            var e_desc = $("<div>")
                .attr("class", "char_desc")
                .html(e.name)
                .appendTo(e_box);

            var e_summ = $("<div>")
                .attr("class", "char_summ")
                .html(e.quote)
                .appendTo(e_desc);

            var e_img = $("<div>")
                .attr("class", "e_img")
                .html(e.img)
                .appendTo(e_box);

            ai_spd = stats[0];
            ai_str = stats[1];
            ai_sta = stats[2];
            ai_mag = stats[3];
            ai_dex = stats[4];

            e_health = (ai_str * 50) + (health_base);
            e_health_curr = (ai_str * 50) + (health_base);

            var e_health_shl = $("<div>")
                .attr("class", "scale_shell")
                .appendTo(e_box);

            var e_health_disp = $("<div>")
                .attr("class", "scale")
                .html("" + e_health + "")
                .appendTo(e_health_shl);

            e_stamina = ((ai_str * 100) + ((ai_spd / 2) + (ai_sta / 2) * 100) + stamina_base);
            e_stamina_curr = e_stamina;

            var e_stam_shl = $("<div>")
                .attr("class", "scale_stashl")
                .appendTo(e_box);

            var e_stam_disp = $("<div>")
                .attr("class", "scale_sta")
                .html(e_stamina)
                .appendTo(e_stam_shl);
        }
        var count = 0;
        if (roll = 1) {
            for (var enemies in low) {
                count++;
                var e_desc = low[enemies]
                var choice = Math.round(Math.random() * count);
            }
            e_pick(low[choice]);
        }

        else if (roll = 2) {
            for (var enemies in med) {
                count++;
                var e_desc = med[enemies]
                var choice = Math.round(Math.random() * count);
            }
            e_pick(med[choice]);
        }
    });
}

var char_selection = function () {
    $.getJSON("characters.json", function (json) {

        var quick_skills = function (character, div) {
            spd = character.speed;
            str = character.strength;
            sta = character.stamina;
            mag = character.magicka;
            dex = character.dexterity;

            p_health = (str * 75) + (health_base);
            p_health_curr = p_health;

            var skill_index = { "speed": spd, "strength": str, "stamina": sta, "magicka": mag, "dexterity": dex };
            var skill_name = ["<img src=\"images/icon_spd.png\" />", "<img src=\"images/icon_str.png\" />", "Stamina", "<img src=\"images/icon_mag.png\" />", "Dexterity"]

            var i = -1;

            var quicktable = $("<table cols='2' width='100%' >")
                .attr("class", "quick_stat")
                .appendTo(div);

            for (var skills in skill_index) {
                var text = skill_index[skills];
                var tabwid = $(".quick_stat").width() * 0.9;
                i++;

                quicktable
                    .append($("<tr>")
                        .append($("<td>")
                            .attr("class", "icwid")
                            .attr("width", "10%")
                            .attr("height", "32px")
                            .attr("align", "center")
                            .html(skill_name[i]))
                        .append($("<td>")
                            .attr("width", "90%")
                            .attr("height", "32px")
                            .attr("class", "tabwid")
                            .append($("<div>")
                                .attr("class", "qstat_scl")
                                .attr("style", "width:" + Math.round(((text / 10) * tabwid)) + "px")
                                .css({ "background-color": scale_col(text * 10) })
                            )
                        )
                    )
            }
        }
        shell.empty();
        var allcharacters = json.characters;
        for (var chars in allcharacters) {

            var battle = function (pick) {

                shell.empty();

                var player_div = $("<div>")
                    .attr("id", "player")
                    .attr("class", "char_btn")
                    .attr("style", "clear:both;")
                    .appendTo(shell);

                var player_n = $("<div>")
                    .attr("class", "char_desc")
                    .html(pick.name)
                    .appendTo(player_div);

                var player_img = $("<div>")
                    .attr("class", "p_img")
                    .html(pick.img)
                    .appendTo(player_div);

                var player_hp = $("<div>")
                    .attr("class", "scale_shell");

                player_hp.appendTo(player_div);

                var player_stam = 0;

                var e_health_disp = $("<div>")
                    .attr("class", "scale")
                    .html("" + p_health + "")
                    .appendTo(player_hp);

                p_stamina_curr = ((str * 100) + ((spd / 2 + sta / 2) * 100) + stamina_base);
                p_stamina = p_stamina_curr;

                var p_stam_shl = $("<div>")
                    .attr("class", "scale_stashl")
                    .appendTo(player_div);

                var p_stam_disp = $("<div>")
                    .attr("class", "scale_sta")
                    .html("" + p_stamina + "")
                    .appendTo(p_stam_shl);

                var versus = $("<div>")
                    .attr("class", "versus")
                    .html("VERSUS")
                    .appendTo(shell);

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
                    .appendTo(player_n);

                var defenses = $("<div>")
                    .attr("class", "defenses")
                    .append(headerD)
                    .appendTo(player_n);

                var atk = pick.attack;
                var def = pick.defense;

                var subs = function (id, attack) {
                    var curr_atk = atk[attack.toString()];
                    var rtn = curr_atk.ary[id];
                    return rtn;
                };
                var def_sub = function (id, defend) {
                    console.log(id, defend);
                    var curr_def = def[defend.toString()];
                    var rtn = curr_def.ary[id] + (sta * 1.5);
                    return rtn;
                }

                var stamina_check = function (rem_stam, curr_stam, div) {
                    console.log(curr_stam, rem_stam);
                    if (rem_stam >= curr_stam) {
                        return ("attack!")
                    }
                    else {
                        console.log("insufficient stamina");
                        shake_stambar($("#player .scale_stashl"));
                        return;
                    }
                };

                var stams = function (id, stamina) {
                    var curr_take = atk[stamina.toString()];
                    var rtn = (curr_take.ary[id]);
                    return rtn;
                }

                for (var atks in atk) {
                    var atk_all = atk[atks];
                    var atk_ary = atk_all.ary;

                    var skills = $("<div>")
                        .attr("class", "half_btn")
                        .attr("id", atk_all.attackId)
                        .text(atk_all.name)
                        .mouseenter(function () {
                            $(this).append($("<div>")
                                .hide()
                                .attr("class", "stat_detail")
                                .slideDown(200)
                                .html("Stamina Cost: " + subs(1, $(this).attr("id")) + "<br/>" + "Damage: " + subs(0, $(this).attr("id")) + "<br/>Crit Chance: " + subs(2, $(this).attr("id")) + "%")
                            )
                        })
                        .mouseleave(function () {
                            $(this).children().slideUp(200).remove();
                        })
                        .click(function () {
                            var rem_stam = p_stamina;
                            var curr_stam = subs(1, $(this).attr("id"));
                            if (rem_stam >= curr_stam) {
                                determine_attack($("#enemy .scale_shell"), atk[$(this).attr("id")], subs(1, $(this).attr("id")));
                            }
                            else {
                                console.log("insufficient stamina");
                                shake_stambar($("#player .scale_stashl"));
                            }
                        })
                        .appendTo(attacks)
                        .hide();
                }

                for (var defs in def) {
                    var def_all = def[defs];
                    var def_ary = def_all.ary;
                    console.log(def_all);
                    var skills = $("<div>")
                        .attr("class", "half_btn")
                        .attr("id", def_all.defenseId)
                        .text(def_all.name)
                        .mouseenter(function () {
                            $(this).append($("<div>")
                                .hide()
                                .attr("class", "stat_detail")
                                .slideDown(200)
                                .html("Stamina Cost: " + def_sub(0, $(this).attr("id")) + "<br/>" + "Buffer: " + def_sub(1, $(this).attr("id")))
                            )
                        })
                        .mouseleave(function () {
                            $(this).children().slideUp(200).remove();
                        })
                        .click(function () {
                            var rem_stam = p_stamina;
                            var curr_stam = def_sub(1, $(this).attr("id"));
                            if (rem_stam >= curr_stam) {
                                console.log(def);
                                determine_defense($("#player .scale_shell"), def[$(this).attr("id")], def_sub(1, $(this).attr("id")));
                            }
                            else {
                                console.log("insufficient stamina");
                                shake_stambar($("#player .scale_stashl"));
                            }
                        })
                        .appendTo(defenses)
                        .hide();
                }
            }

            var ids = allcharacters[chars];

            var tiles = $("<div>")
                .hide()
                .fadeIn(200)
                .attr("class", "char_btn")
                .attr("id", ids.num)
                .appendTo(shell)
                .mouseenter(function () {
                    var send_id = allcharacters[$(this).attr("id")];
                    quick_skills(send_id, $(this));
                })
                .mouseleave(function () {
                    $(".quick_stat").fadeOut(200, function () {
                        $(this).remove();
                    })
                })
                .click(function () {
                    var send_id = allcharacters[$(this).attr("id")];
                    battle(send_id);
                })

            var image = $("<div>")
                .attr("class", "char_img")
                .append(ids.img)
                .appendTo(tiles);

            var desc = $("<div>")
                .attr("class", "char_desc")
                .text(ids.name)
                .appendTo(tiles);
        }
    });
}

var instructions = function () {

}

var main_menu = function () {

    var play = $("<div>")
        .attr("class", "wide_btn")
        .attr("id", "play")
        .text("Play!")
        .appendTo(shell)
        .click(function () {
            char_selection();
        })

    var instruction_div = $("<div>")
        .attr("class", "wide_btn")
        .attr("id", "htp")
        .text("How to Play")
        .appendTo(shell)
        .click(function () {
            instructions();
        })

    $("body").append(shell);

    $(".wide_btn")
        .mouseenter(function () {
            rand_punch();
        })
        .click(function () {
            var zap = new Audio("sound/zap.mp3");
            zap.normalize();
            zap.volume = 0.2;
            zap.play();
        });
}
var playlist = function () {
    $.getJSON("soundtrack.json", function (trk) {
        var playlist_exec = function (vtrk, array, current, div) {
            div.append(
                $("<div>")
                    .attr("class", "music_track")
                    .text(vtrk.name)
            );
            var next_trk = function () {
                curr_track.pause();
                var nxtrk = vtrk.id++;
                nxtrk++;
                var next = array[nxtrk];
                current = new Audio(next.v);
                curr_track = current;
                $(".music_track").text(next.name);
                curr_track.volume = 0.35;
                curr_track.play();
            }
            var prev_track = function () {

            }
            div.append(
                $("<div>")
                    .attr("id", "nexprv")
                    .attr("class", "prev_btn")
                    .click(function () {
                        prev_trk();
                    })
            )
            div.append(
                $("<div>")
                    .attr("id", "nexprv")
                    .attr("class", "next_btn")
                    .click(function () {
                        next_trk();
                    })
            )
            curr_track = new Audio(vtrk.v)
            curr_track.play();
        };

        var divtracklist = "";
        var arytracklist = [];
        var tracklist = "";
        var all = trk;
        var tracklistdiv = $("<div>")
            .attr("class", "music_shell")
            .appendTo(shell);
        for (var i in all) {
            var tracks = all[i];
            for (var t in tracks) {
                var indtrk = tracks[t];
                curr_track = indtrk.v;
                arytracklist.push(indtrk);
            }
            var track = arytracklist[0];
            playlist_exec(track, arytracklist, curr_track, tracklistdiv);
        }
    });
}
playlist();

var turn_check = function () {
    atk_count++;
    if (atk_count % 2) {
        null;
    }
    else {
        if (p_health >= 500 || p_stamina >= 400) {
            p_stamina_curr += 50;
        }
        else if (p_health >= 300 || p_stamina >= 200) {
            p_stamina_curr += 100
        }
        else {
            p_stamina_curr += 200;
        }
        console.log(p_stamina, p_stamina_curr);
        get_health($("#player .scale_stashl"), p_stamina_curr, p_stamina);
        p_stamina = p_stamina_curr;
        enemy_atk(ai_str);
    }
}