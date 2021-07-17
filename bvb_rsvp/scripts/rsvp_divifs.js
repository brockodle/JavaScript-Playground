$(document).ready(function () {

    var tablenum = 0;
    var tablemembers = [];
    var currplayers = 0;
    var tables = [];

    function table (number, name, players) {
        this.tid = name;
        this.pnum = players;
    }

    var make_color = function (divid) {
        console.log(divid);
        var col1 = Math.round(Math.random() * 127);
        var col2 = Math.round(Math.random() * 127);
        var col3 = Math.round(Math.random() * 127);
        var newcol = col1 + "," + col2 + "," + col3;
        console.log(newcol);
        return (newcol);
    }

    var addtable = function () {
        tablenum++;
        if (tablenum > 4) {
            alert("No more available decks");
        }
        else {
            var table = new table(tablenum, "table"+tablenum, 0);
            tables.push(table);
            $("<div>")
                .attr("class", "tablewindow")
                .attr("id", table.tid)
                .html("<strong>Table " + tablenum)
                .appendTo($("#base_tbl"));
        }
    }

    var addplayer = function (name) {
        var totalplayers = tablenum * 4;
        var randonum = Math.round(Math.random() * 500);
        var pid = {
            id: "p" + randonum,
            table: "table" + tablenum
        }

        if (name == null || name == "") {
            alert("Please enter a name");
        }
        else {
            if (currplayers >= totalplayers) {
                alert("Tables are full!");
            }
            else {
                var currtable = 0;
                if (currplayers < 4) {
                    currplayers++;
                    currtable = 1;
                }
                else if (currplayers < 8) {
                    currplayers++;
                    currtable = 2;
                }
                else if (currplayers < 12) {
                    currplayers++;
                    currtable = 3;
                }
                else if (currplayers < 16) {
                    currplayers++;
                    currtable = 4;
                }
                else {
                    alert("Tables are Full!");
                }
                $("<div>")
                    .attr("class", "playerbtn")
                    .attr("id", pid.id)
                    .css({ "background-color": "rgb(" + make_color($("#table" + tablenum)) + ")" })
                    .html(name)
                    .on("tap, click", function () {
                        var pos = $(this).offset();
                        var rightside = pos.left + $(this).width();
                        var topside = pos.top;
                        console.log(currplayers, tablemembers);
                        $(this).remove()
                        currplayers--;
                        toberemoved(pid);
                        console.log(currplayers, tablemembers);
                    })
                    .appendTo($("#table" + currtable));

                for (var i in tablemembers) {
                    var ppick = tablemembers[i];
                    do {
                        console.log(randonum + " is doubled");
                        randonum = Math.round(Math.random() * 500);
                    }
                    while (ppick == pid.id);
                }
                tablemembers.push(pid.id);
                console.log(tablemembers);
                console.log(totalplayers);
                console.log(currplayers);
            }
        }
    }

    var header = $("<div>")
        .attr("class", "header")
        .html("<strong>Bears Vs. Babies Table RSVP</strong>")
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
            .attr("class", "rembtn")
            .text("Remove Player")
            .on("tap, click", function () {

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
                    var userInput = document.getElementById("namefield").value;
                    document.getElementById("namefield").innerHTML = userInput;
                    addplayer(userInput);
                })
            )
            .append(
            $("<input>")
                .attr("type", "textfield")
                .attr("id", "namefield")
            )
        )
        .append("<hr/>")
        .appendTo($("#base_tbl"));

});