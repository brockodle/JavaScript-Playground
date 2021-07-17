/*object groups such as this*/
/*character object/enemy object*/
var charname;
var userinrace;
var userinclass;
var baseabs = [{
    "strength": roll4d6(),
    "dexterity": roll4d6(),
    "constitution": roll4d6(),
    "charisma": roll4d6(),
    "wisdom": roll4d6(),
    "intelligence": roll4d6()
}];

var races = ["orbian", "karovidan", "barclin", "urufen"];

var herostruct = function (name, charrace, charclass, inventory, level, xp, abilities, hp) {
    this.name = name;
    this.charrace = charrace;
    this.charclass = charclass;
    this.inventory = inventory;
    this.level = level;
    this.xp = xp;
    this.abilities = abilities;
    this.hp = hp;
}

function roll4d6() {
    var dicetotal = 0;
    var diceray = [];
    var dice;
    for (var i = 0; i < 4; i++) {
        dice = Math.round(Math.random() * 6);
        if (dice <= 1) {
            i--;
        }
        if (dice > 1) {
            diceray.push(dice);
            dicetotal += dice;
        } else {
            null;
        }
    };
    diceray.sort();
    dicetotal -= diceray[0];
    return dicetotal;
}

function classstats(character, newclass, abs, sks) {
    if (userinclass === "rogue") {
        var thisabs = abs[0];
        var thischar = character;
        thisabs.strength += 0;
        thisabs.dexterity += 2;
        thisabs.constitution += 0;
        thisabs.wisdom += 0;
        thisabs.intelligence += 0;
        thisabs.charisma += 0;
        thischar.hp += 8;
        character.classabil = [{
            "Sneak Attack": "every first attack you land on an enemy gains 6 damage plus your current level",
            "Jump to It": "ranged attacks from a bow gain a +2 to damage"
        }]
    }
};

function racestats(character, newrace, abs, sks) {
    if (userinrace === "orbian") {
        var thisabs = abs[0];
        var thischar = character;
        thisabs.strength += 0;
        thisabs.dexterity += 2;
        thisabs.constitution += 0;
        thisabs.wisdom += 0;
        thisabs.intelligence += 0;
        thisabs.charisma += 0;
        character.raceabil = [{
            deathspin: "every landed melee attack gains a +1 bonus to damage dealt"
            /*gain: function () {
                if (melee == true) {
                    return +1;
                }
            }*/
        }];
    };
};

$(document).ready(function () {
    function makepchar() {
        $('<div>')
            .addClass('titlemain')
            .html('((Orbios))<hr/>')
            .appendTo('#mobilebody')
        $('<input>')
            .attr('id', 'charin')
            .attr('class', 'charname_in')
            .attr('type', 'text')
            .attr('placeholder', 'Enter Character Name')
            .on('keydown', function (k) {
                var named = document.getElementById('charin').value;
                if (k.keyCode === 13) {
                    if (named === '') {
                        alert('Please enter a name');
                        return;
                    }
                    charname = named;
                    console.log(named);
                    $(this).hide();
                    $('.submitbtn').hide();
                    $(this).after(
                        $('<div>')
                        .attr('class', 'charname_in')
                        .attr('style', 'border:none')
                        .html("Name:<br/>" + charname)
                    )
                }
            })
            .appendTo($('#mobilebody'));
        $('<input>')
            .addClass('submitbtn')
            .attr('type', 'submit')
            .on('tap, click', function () {
                var named = document.getElementById('charin').value;
                if (named === '') {
                    alert('Please enter a name');
                    return;
                }
                charname = named;
                console.log(named);
                $(this).hide();
                $('#charin').hide();
                $(this).after(
                    $('<div>')
                    .attr('class', 'charname_in')
                    .attr('style', 'border:none')
                    .html("Name:<br/>" + charname)
                )
            })
            .appendTo($('#mobilebody'));
        $('<div>')
            .addClass('dropdown_race_shell')
            .html('<span style="font-size:14pt;"><strong>Choose Your Race</strong></span>')
            .on('tap, click', function () {
                var thischil = $(this).children();
                thischil.not($('span')).slideDown(100);
                $(this).off();
            })
            .append(
                $('<div>')
                .hide()
                .addClass('dropdown_race_menu')
                .attr('id', 'menu')
            )
            .appendTo($('#mobilebody'));

        function racemenumaker() {
            for (var dr = 0; dr < races.length; dr++) {
                $('<div>')
                    .addClass('dropdown_race_text')
                    .attr('race', races[dr])
                    .text(races[dr])
                    .appendTo($('.dropdown_race_menu'))
                console.log(dr);
            }
        }
        racemenumaker();

        /* var pchar = new herostruct(charname, userinrace, userinclass, [], 1, 0, baseabs, 25);
        racestats(pchar, pchar.race, pchar.abilities);
        classstats(pchar, pchar.class, pchar.abilities);
        console.log(pchar); */

        $('.dropdown_race_text')
            .on('tap, click', function () {
                console.log($(this).attr('race'));
                userinrace = $(this).attr('race');
                console.log(userinrace);
                $('.dropdown_race_shell')
                    .html('<span style="font-size:14pt;"><strong>' + userinrace + '</strong></span>')
                    .append(
                        $('<div>')
                            .hide()
                            .addClass('dropdown_race_menu')
                            .attr('id', 'menu')
                    )
                    .on('tap,click', function () {
                        var thischil = $(this).children();
                        thischil.not($('span')).slideDown(100);
                        $(this).off();
                    })
                    //CONTINUE HERE
                    //RESOLVE RE-APPLYING MENU ISSUE
                $('.dropdown_race_menu').slideUp(100);
                racemenumaker();
            })
    }
    makepchar();

    function buildvis() {
        var statpulls = [{}];
        var statar = [];
        var statamt = [];
        var classabstitles = [];
        var classabsdesc = [];
        var abis = pchar.abilities;
        var keeper;
        for (var s in abis) {
            var blockabis = abis[s];
            console.log(Object.keys(blockabis));
            statpulls = blockabis;
        }
        console.log(statpulls);
        if (pchar.charclass === "rogue") {
            $('<div>')
                .attr('class', 'charclass')
                .attr('style', 'margin-bottom:0')
                .text(pchar.name)
                .appendTo($('#mobilebody'))
            $('<div>')
                .attr('class', 'charclass')
                .html(pchar.charrace + "<br/><strong>&nbsp;" + pchar.charclass + "</strong>")
                .appendTo($('#mobilebody'))
            $('<img>')
                .attr('class', 'charimg')
                .attr('src', 'http://nichegamer.s3-us-west-2.amazonaws.com/wp-content/uploads/2017/05/12100406/thief-05-12-17-1.jpg')
                .appendTo($('#mobilebody'));
            statar = Object.keys(statpulls);
            statamt = Object.values(statpulls);
            console.log(statar);
            for (var o in statar) {
                $('<div>')
                    .attr('class', 'charscrn_statblock')
                    .append(
                        $('<div>')
                        .attr('class', 'statname')
                        .text(statar[o])
                    )
                    .append(
                        $('<div>')
                        .attr('class', 'statbar')
                        .text(statamt[o])
                        .css({
                            width: function () {
                                var widaut = Math.round((statamt[o] / 20) * 64);
                                if (widaut > 64) {
                                    widaut = 64;
                                    return widaut + '%';
                                }
                                return widaut + '%';
                            }
                        })
                    )
                    .appendTo($('#mobilebody'));
            }
        }
        var classabils = pchar.classabil;
        classabstitles = Object.keys(classabils[0]);
        classabsdesc = Object.values(classabils[0]);
        console.log(classabstitles);
        console.log(classabsdesc);
        $('<div>')
            .attr('class', 'charclassabsshell')
            .appendTo($('#mobilebody'));
        for (var c in classabstitles) {
            $('<div>')
                .attr('class', 'charclassabs')
                .html('<strong>' + classabstitles[c] + ':&nbsp;</strong>' + classabsdesc[c])
                .appendTo($('.charclassabsshell'));
        }
    }
});
jQuery(window).on('swipeleft', function () {
    $('#mobilebody').hide();
});