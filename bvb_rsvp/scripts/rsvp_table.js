$(document).ready(function () {

    var colsnum = 0;
    var tablemembers = [];
    var currplayers = 0;

    var addtitles = function (change) {
        colsnum++;
        console.log(change);
        $(".titles")
            .append(
                $("<td>")
                    .html("<strong>Table " + colsnum + "</strong>")
                    .attr("id","title"+colsnum)
            )
        if (colsnum >= 4){
            $(".tablebtn").hide();
        }
        addplayerrows();
    }

    var addplayerrows = function () {
        $(".playersrow")
        .append(
            $("<td width='25%' >")
                .attr("id","table"+colsnum)
        )
    }

    var make_color = function(divid){
        console.log(divid);
        var col1 = Math.round(Math.random()*127);
        var col2 = Math.round(Math.random()*127);
        var col3 = Math.round(Math.random()*127);
        var newcol = col1 + "," + col2 + "," + col3;
        console.log(newcol);
        return (newcol);
    }

    var addtotable = function (current, total, name) {
        console.log(name);
        if (current <= 4) {
            var thisis = name + Math.round(Math.random()*50);
            $("#table1").append(
                $("<div>")
                    .attr("id", thisis)
                    .attr("class","playerbtn")
                    .css({"background-color":"rgb(" + (make_color(thisis) + ")")})
                    .html(name)
            )
        }
        else if (current <= 8) {
            var thisis = name + Math.round(Math.random()*50);
            $("#table2").append(
                $("<div>")
                    .attr("id", thisis)
                    .attr("class","playerbtn")
                    .css({"background-color":"rgb(" + (make_color(thisis) + ")")})
                    .html(name)
            )
        }
        else if (current <= 12) {
            var thisis = name + Math.round(Math.random()*50);
            $("#table3").append(
                $("<div>")
                    .attr("id", thisis)
                    .attr("class","playerbtn")
                    .css({"background-color":"rgb(" + (make_color(thisis) + ")")})
                    .html(name)
            )
        }
        else {
            var thisis = name + Math.round(Math.random()*50);
            $("#table4").append(
                $("<div>")
                    .attr("id", thisis)
                    .attr("class","playerbtn")
                    .css({"background-color":"rgb(" + (make_color(thisis) + ")")})
                    .html(name)
            )
        }
    }

    var maketable = function () {
        var tb_spawn = $("<table>")
            .attr("cols", colsnum)
            .attr("width", "100%")
            .attr("cellpadding", "10")
            .attr("class", "maintbl")
            .append(
            $("<th colspan='4' >")
                .attr("class", "tabtitle")
                .html("<h1>Bears Vs. Babies Table Que</h1>")
            )
            .append(
            $("<tr class='addstuff'>")
                .attr("colspan", colsnum)
                .attr("class", "buttoncell")
                .append(
                $("<td>")
                    .append(
                    $("<div>")
                        .attr("class", "tablebtn")
                        .html("Add Table")
                        .on("tap, click", function () {
                            addtitles();
                        })
                    )
                )
                .append(
                $("<td>")
                    .append(
                    $("<div>")
                        .attr("class", "addbtn")
                        .css({ "background-color": "#2F9AC7" })
                        .html("Add Player")
                        .on("tap, click", function () {
                            var totalplayers = colsnum * 4;
                            var userInput = document.getElementById("namefield").value;
                            document.getElementById("namefield").innerHTML = userInput;
                            if (tablemembers.length >= totalplayers) {
                                alert("No more spaces available");
                                return;
                            }
                            else {
                                tablemembers.push(userInput);
                                console.log(tablemembers.length, totalplayers, userInput);
                                addtotable(tablemembers.length, totalplayers, userInput);
                                return;
                            }
                        }
                        )
                    )
                    .append(
                    $("<input>")
                        .attr("type", "textfield")
                        .attr("id", "namefield")
                    )
                )
                .append(
                $("<td>")
                    .append(
                    $("<div>")
                        .attr("class", "rembtn")
                        .css({ "background-color": "#F2E848", "color": "#000000" })
                        .html("Remove Player")
                        .on("tap, click", function () {

                        }
                        )
                    )
                )
            )
            .append(
            $("<tr class='titles'>")
            )
            .append(
            $("<tr class='playersrow'>")
            )
            .appendTo($("#base_tbl"));

        if (colsnum > 3) {
            $(".tablebtn").hide();
            console.log("nums checked");
        }
    }
    maketable();
});