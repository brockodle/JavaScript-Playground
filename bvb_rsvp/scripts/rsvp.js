$(document).ready(function () {

    var pbclone = "";

    var tablenum = 0;
    var tablemembers = [];
    var currplayers = 0;
    var tables = [];
    var table = 0;
    var gamecount = 0;
    var timercounter = 1;
    var tottime = 0;
    var gameclock1 = new Timer();
    var gameclock2 = new Timer();
    var gameclock3 = new Timer();
    var gameclock4 = new Timer();
    var prevtable = "";

    $("*").removeClass("hovertab");

    $("#base_tbl").css({ "margin": "0" });

    function tablemaker(number, name, players) {
        this.tnum = number;
        this.tid = name;
        this.pnum = players;
    }

    function player(id, table) {
        this.id = "p" + id;
        this.table = "table" + table;
    }

    var make_color = function (divid) {
        console.log(divid);
        var col1 = Math.round(Math.random() * 127);
        var col2 = Math.round(Math.random() * 127);
        var col3 = Math.round(Math.random() * 127);
        var newcol = col1 + "," + col2 + "," + col3;
        return (newcol);
    }

    var dragtablecheck = function (tabledrop, positionprev, thisdiv, camera) {
        var totalplayers = tablenum * 4;
        console.log("Dropped table: ", tabledrop);
        console.log("Previous table: ", prevtable);

        for (var i in tables) {
            var curr = tables[i];
            console.log(curr);
            if (thisdiv.parent().attr("id") === curr.tid) {
                console.log("ids matched");
                prevtable = tables[i];
                break;
            }
            else {
                null;
            }
            console.log("table ", curr.tnum, "players: ", curr.pnum);
        };
        console.log(prevtable);

        if (tabledrop.pnum >= 4) {
            console.log("No more spots available");
            thisdiv.offset(positionprev);
            console.log("Dropped table: ", tabledrop);
            console.log("Previous table: ", prevtable);
            thisdiv.css({ "left": "0", "top": "0" }, 100);
            return;
        }
        else if (tabledrop.pnum < 4) {
            tabledrop.pnum++;
            prevtable.pnum--;
            camera.appendTo($("#" + tabledrop.tid))
            thisdiv.appendTo($("#" + tabledrop.tid))
            thisdiv.replaceWith(pbclone);
            thisdiv.css({ "left": "0", "top": "0" });
            console.log("Dropped table: ", tabledrop);
            console.log("Previous table: ", prevtable);
            return;
        }
        else {
            return;
        }
        return;
    }

    var start_timer = function (parentdiv, thisdiv) {
        var usertime = prompt("How long (minutes)?");
        //prompt.attr("type","tel").attr("pattern","[0-9]*");
        $(".gamecounter").css({ "background-color": "darkgreen" });
        if (isNaN(usertime) == true) {
            start_timer(parentdiv, thisdiv);
        }
        if (isNaN(usertime) == false) {
            var gameclockdisplay = Number(usertime) * 60;
            var minutecounter = 0;
            timercounter++;
            var gameclock = 0;

            if (parentdiv.attr("id") == "table1") {
                gameclock = gameclock1;
                console.log("table 1");
            }

            if (parentdiv.attr("id") == "table2") {
                gameclock = gameclock2;
                console.log("table 2");
            }

            if (parentdiv.attr("id") == "table3") {
                gameclock = gameclock3;
                console.log("table 3");
            }

            if (parentdiv.attr("id") == "table4") {
                gameclock = gameclock4;
                console.log("table 4");
            }

            var checkcounter = function (time) {
                tottime = (gameclockdisplay / 60);
                if (time <= tottime * 0.666) {
                    thisdiv.css({ "background-color": "darkorange" })
                }
                if (time <= tottime * 0.333) {
                    thisdiv.css({ "background-color": "maroon" })
                }
                else {
                    null;
                }
            }
            gameclockdisplay = Number(usertime) * 60;
            gameclock.options({
                ontick: function () {
                    minutecounter = Math.round(((gameclock.getDuration()) / 1000) / 60);
                    thisdiv.html(minutecounter + " minutes");
                    checkcounter(minutecounter);
                }
            });
            gameclock.start(gameclockdisplay).on('end', function () {
                alert("Check on " + parentdiv.attr("id"));
            });
            if (timercounter % 2) {
                gameclock.stop();
                gameclock.off();
                gameclock = new Timer();
                start_timer(parentdiv, thisdiv);
            }
        }
    }

    var addtable = function () {
        tablenum++;
        if (tablenum > 4) {
            alert("No more available decks");
        }
        else {
            table = new tablemaker(tablenum, "table" + tablenum, 0);
            tables.push(table);
            var tableclone = "";
            $("<div>")
                .attr("class", "tablewindow")
                .attr("id", table.tid)
                .droppable({
                    hoverClass: "hovertab",
                    hover: $(this).children().css({ "opacity": "1 !important" }),
                    out: $(this).removeClass("hovertab")
                })
                .html("<strong>Table " + tablenum)
                .append(
                $("<div>")
                    .attr("class", "gamecounter")
                    .text("Start Timer")
                    .on("tap, click", function () {
                        start_timer($(this).parent(), $(this));
                    })
                )
                .appendTo($("#base_tbl"))

                .append("<hr/>")
                .animate({ "left": "-=15", "width": "-=2.5%" }, 100, function () {
                    $(this).animate({ "left": "+=15", "width": "+=2.5%" }, 100);
                });
        }
    }

    var table_check = function () {
        for (var i in tables) {
            var newtbl = tables[i];
            if (newtbl.pnum >= 4) {
                console.log("Too many players. " + newtbl.pnum + " currently.");
            }
            else if (newtbl.pnum < 4) {
                currplayers++;
                return newtbl;
            }
            else {
                alert("All tables full!");
            }
        }
    }

    var addplayer = function (name) {

        var tablep = 0;
        var thispick = "";
        var totalplayers = tablenum * 4;
        var randonum = Math.round(Math.random() * 500);
        var pid = new player(randonum);
        for (var i in tables) {
            tablep += tables[i].pnum;
            console.log(tablep);
        }
        if (name == null || name == "") {
            alert("Please enter a name");
        }
        else {
            if (tablep >= totalplayers) {
                alert("Tables are full!");
            }
            else {
                thispick = table_check();
                pid.table = thispick.tnum;
                if (thispick.pnum < 4 || currplayers < 16) {

                    var thiscoords = "";
                    var tabid = "";
                    var cambtn = $("<div>")
                        .attr("id", "i" + pid.id)
                        .attr("class", "cambtn")
                        .append(
                        $("<i>")
                            .addClass("fa-camera-retro fa fa-lg fa-inverse")
                        )
                        .on("tap, click", function () {
                            var i = $(this).find('i')

                            if (i.hasClass('fa-camera-retro fa fa-lg fa-inverse')) {
                                i.removeClass('fa-camera-retro fa fa-lg fa-inverse').addClass('fa-ban fa fa-lg fa-inverse')
                            }
                            else {
                                i.removeClass('fa-ban fa fa-lg fa-inverse').addClass('fa-camera-retro fa fa-lg fa-inverse')
                            }
                        })
                        .appendTo($("#" + thispick.tid))

                    $("<div>")
                        .attr("class", "playerbtn")
                        .attr("id", pid.id)
                        .draggable({
                            containment: "window"
                        })
                        .on("dragstart", function () {
                            posstart = $(this).offset();
                            $(this).animate({ "width": "+=10", "height": "+=10", "padding": "+=10" }, 100);
                        })
                        .on("drag", function () {
                            pbclone = $(this);
                            thiscoords = $(this).offset();
                        })
                        .on("dragstop", function () {
                            $(this).animate({ "width": "-=10", "height": "-=10", "padding": "-=10" }, 100);
                            $(this).animate({ "left": pbclone.left, "top": pbclone.top, "padding": pbclone.attr("padding") }, 100);
                            var thisdivis = $(this);
                            var tabwid = "";
                            var tabht = ""
                            var tabxmax = "";
                            var tabymin = "";
                            for (var i in tables) {
                                tabid = tables[i];
                                var tabledecided = false;
                                var thisx = thiscoords.left;
                                var thisy = thiscoords.top;
                                var thiswid = $(this).width();
                                var thisht = $(this).height();
                                var tablecoords = $("#" + tables[i].tid).offset();
                                var tableids = $("#" + tables[i].tid);
                                tabwid = tableids.width();
                                tabht = tableids.height();
                                tabxmax = tablecoords.left + tabwid;
                                tabymin = tablecoords.top + tabht;
                                if (thisx <= tabxmax && thisx >= tablecoords.left && thisy <= tabymin && thisy >= tablecoords.top) {
                                    tabledecided = true;
                                    break;
                                }
                                else {
                                    tabledecided = false;
                                }
                            }
                            if (tabledecided == true) {
                                console.log("tabledecided turned true");
                                dragtablecheck(tabid, posstart, thisdivis, cambtn);
                                return;
                            }
                            else if (tabledecided == false) {
                                tableids = "";
                                console.log("tabledecided turned false");
                                $(this).offset(posstart);
                                $(this).animate({ "left": pbclone.left, "top": pbclone.top }, 100);
                                return;
                            }
                            else {
                                return;
                            }
                        })
                        .css({ "background-color": "rgb(" + make_color($(pid.id)) + ")" })
                        .html(name)
                        .on("tap, click", function () {
                            $(this).animate({ "left": "-=5", "top": "+=5", "width": "+=10", "height": "+=10" }, 100, function () {
                                $(this).animate({ "left": "+=5", "top": "-=5", "width": "-=10", "height": "-=10" }, 100, function () {
                                    $(this).fadeOut(100);
                                    $(this).remove();
                                })
                            });
                            cambtn.animate({ "left": "-=5", "top": "+=5", "width": "+=10", "height": "+=10" }, 100, function () {
                                $(this).animate({ "left": "+=5", "top": "-=5", "width": "-=10", "height": "-=10" }, 100, function () {
                                    cambtn.fadeOut(100);
                                    cambtn.remove();
                                })
                            });
                            for (var i in tables) {
                                var currrem = tables[i];
                                if ($(this).parent().attr("id") === currrem.tid) {
                                    thispick = currrem;
                                    thispick.pnum--;
                                    break;
                                }
                                else {
                                    null;
                                }
                            }
                            currplayers--;
                            tablemembers.splice(pid.id, 1);
                        })
                        .appendTo($("#" + thispick.tid))
                        .animate({ "left": "+=5", "top": "-=5", "width": "-=10", "height": "-=10" }, 100, function () {
                            $(this).animate({ "left": "-=5", "top": "+=5", "width": "+=10", "height": "+=10" }, 100);
                        })
                    thispick.pnum++;

                    for (var i in tablemembers) {
                        var ppick = tablemembers[i];
                        do {
                            randonum = Math.round(Math.random() * 500);
                            pid = new player(randonum);
                        }
                        while (ppick == pid.id);
                    }
                    tablemembers.push(pid.id);
                }
                else {
                    alert("Tables are Full!");
                }
            }
        }
    }
    var bg = $("<img>")
        .attr("id", "bg")
        .attr("src", "images/bg.jpg")
        .attr("width", "100%")
        .appendTo("#base_tbl");

    var logoimg = $("<img>")
        .attr("src", "images/logo.png")
        .attr("width", "100%")
        .attr("id", "bannerimg")
        .appendTo($("#base_tbl"));

    var buttons = $("<div>")
        .attr("class", "buttonrow")
        .append(
        $("<div>")
            .attr("class", "tablebtn")
            .text("Add Table")
            .on("tap, click", function () {
                addtable();
            })
        )
        .append(
        $("<div>")
            .attr("class", "addplshell")
            .append(
            $("<div>")
                .attr("class", "addbtn")
                .text("Add Player")
                .on("tap, click", function () {
                    $("#bannerimg").slideUp(100).fadeOut(100).remove();
                    var userInput = document.getElementById("namefield").value;
                    document.getElementById("namefield").innerHTML = userInput;
                    addplayer(userInput);
                })
            )
            .append(
            $("<input>")
                .attr("type", "textfield")
                .attr("id", "namefield")
                .keydown(function (e) {
                    if (e.keyCode == 13) {
                        $("#bannerimg").slideUp(100).fadeOut(100).remove();
                        var userInput = document.getElementById("namefield").value;
                        document.getElementById("namefield").innerHTML = userInput;
                        addplayer(userInput);
                        $(this).blur();
                    }
                })
            )
        )
        .appendTo($("#base_tbl"))
});