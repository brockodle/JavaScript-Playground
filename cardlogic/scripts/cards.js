$(document).ready(function () {

    var deck = [];
    var wholedeckref = [];
    var cardpickone;
    var cardpicktwo;
    var c = 0;
    var p1deck = [];
    var p2deck = [];
    var p1discard = [];
    var p2discard = [];
    var stakecards = 0;
    var stakenumber = 0;
    var cardsound1 = new Audio('sounds/card.wav');
    var cardsound2 = new Audio('sounds/card.wav');
    cardsound1.load();
    cardsound2.load();

    var cardobj = function (name, color, suit, suitlk, value, cardnum) {
        this.name = name;
        this.color = color;
        this.suit = suit;
        this.suitlk = suitlk;
        this.value = value;
        this.cardnum = cardnum;
    }

    function makedeck(colorthis, suitthis, suitfamily) {
        for (var i = 0; i < 13; i++) {
            c++;
            var currcard = new cardobj(null, colorthis, suitfamily, suitthis, i + 2, c);
            if (i < 11) {
                currcard.name = currcard.value;
            }
            if (i == 9) {
                currcard.name = "J";
            }
            if (i == 10) {
                currcard.name = "Q";
            }
            if (i == 11) {
                currcard.name = "K";
            }
            if (i == 12) {
                currcard.name = "A";
            }
            deck.push(currcard);
            wholedeckref.push(currcard);
        }
        return;
    };

    console.log(wholedeckref);

    makedeck('red', '<i class="fas fa-heart"></i>', 'hearts'), makedeck('red', '<i class="fas fa-gem"></i>', 'diamonds'), makedeck('black', '<i class="fas fa-caret-up"></i>', 'spades'), makedeck('black', '<i class="fab fa-canadian-maple-leaf"></i>', 'clubs');

    function resultedcard(player1card, player2card) {

        $('.dealbtn').fadeOut(100);

        function winwar(winnerdiscard, loserdeck, winnerdeck) {
            for (var cards = 0; cards < stakecards; cards++) {
                console.log(loserdeck[cards].name + loserdeck[cards].suit);
                console.log(winnerdeck[cards].name + winnerdeck[cards].suit)
                winnerdiscard.push(loserdeck[cards]);
                winnerdiscard.push(winnerdeck[cards])
            }
        }

        function warwar() {

        }



        function gotowar() {
            function finalflip(final1, final2) {
                var wintext;
                $('<div>')
                    .addClass('cardind')
                    .addClass('cardlft')
                    .css('color', final1.color)
                    .html(final1.name + '&nbsp;' + final1.suitlk)
                    .animate({
                        'top': '80vh',
                        'left': '10vw'
                    }, 200, function () {
                        cardsound1.play();
                    })
                    .appendTo('#deck');

                $('<div>')
                    .css('color', final2.color)
                    .html(final2.name + '&nbsp;' + final2.suitlk)
                    .addClass('cardind')
                    .addClass('cardrt')
                    .animate({
                        'top': '80vh',
                        'right': '10vw'
                    }, 200, function () {
                        cardsound2.play();
                    })
                    .appendTo('#deck');

                if (final1.value > final2.value) {
                    stakecards += 5;
                    wintext = 'Player 1 gets it all!';
                    console.log('p1 wins!', p1deck, p2deck, p1discard);
                    winwar(p1discard, p2deck, p1deck);
                    p1deck.splice(0, 5);
                    p2deck.splice(0, 5);
                }
                if (final1.value < final2.value) {
                    stakecards += 5;
                    wintext = 'Player 2 gets it all!';
                    console.log('p2 wins!', p1deck, p2deck, p2discard);
                    winwar(p2discard, p1deck, p2deck);
                    p1deck.splice(0, 5);
                    p2deck.splice(0, 5);
                }
                if (final1.value == final2.value) {
                    wintext = 'We&rsquo;re not done yet!';
                    console.log('war again!');
                    stakenumber += 5;
                    warwar(p1deck, p2deck, stakenumber);
                }
                $('<div>')
                    .fadeIn(200)
                    .addClass('resulttext')
                    .html(wintext)
                    .appendTo('#deck');

                $('.resulttext')
                    .on('tap click', function () {
                        $('#deck').children().off().not($(this)).animate({
                            'right': '-100vw'
                        }, 200, function () {
                            var thischildren = $('#deck').children().not('.resulttext');
                            thischildren.off();
                            thischildren.fadeOut(100).remove();
                        })
                    })
            }

            collbtn.on('tap click', function () {
                $(this).animate({
                    'top': '92vh',
                    'width': '100vw',
                }, 200, function () {
                    $(this)
                        .empty()
                        .append(
                            $('<div>')
                                .addClass('flipbtn')
                                .html('who wins?!')
                        )
                        .off()
                        .on('click tap', function () {
                            $(this).fadeOut(200)
                            finalflip(p1deck[4], p2deck[4]);
                        });
                });

                for (var s = 1; s < 4; s++) {
                    $('<div>')
                        .hide()
                        .attr('id', p1deck[s].cardnum)
                        .addClass('stakecardp1')
                        .attr('style', '')
                        .css('color', p1deck[s].color)
                        .css('top', (s * 5) + 25 + 'vh')
                        .show()
                        .css({
                            'left': '-100px',
                            'bottom': '-200px',
                            'top': '100vh'
                        })
                        .animate({
                            'left': '5vw',
                            'top': (s * 5) + 25 + 'vh'
                        }, 200 + (100 * s), function () {
                            cardsound1.play();
                        })
                        .on('tap click', function () {
                            var fc;
                            for (var inc in wholedeckref) {
                                var incard = wholedeckref[inc];
                                if (incard.cardnum == $(this).attr('id')) {
                                    fc = incard;
                                }
                            };
                            $(this)
                                .css({
                                    'background-color': 'white',
                                    'border': 'solid 1px black'
                                })
                                .html(fc.name + '&nbsp;' + fc.suitlk);
                            $(this).append(
                                $('<div>')
                                    .addClass('bgcardmini')
                                    .html(fc.suitlk)
                            )
                        })
                        .appendTo('#deck');

                    $('<div>')
                        .hide()
                        .attr('id', p2deck[s].cardnum)
                        .attr('style', '')
                        .addClass('stakecardp2')
                        .css('color', p2deck[s].color)
                        .css('top', (s * 5) + 25 + 'vh')
                        .show()
                        .css({
                            'right': '-100px',
                            'bottom': '-200px',
                            'top': '100vh'
                        })
                        .animate({
                            'right': '5vw',
                            'top': (s * 5) + 25 + 'vh'
                        }, 200 + (100 * s), function () {
                            cardsound2.play()
                        })
                        .on('tap click', function () {
                            var fc;
                            for (var inc in wholedeckref) {
                                var incard = wholedeckref[inc];
                                if (incard.cardnum == $(this).attr('id')) {
                                    fc = incard;
                                }
                            };
                            $(this)
                                .css({
                                    'background-color': 'white',
                                    'border': 'solid 1px black'
                                })
                                .html(fc.name + '&nbsp;' + fc.suitlk);
                            $(this).append(
                                $('<div>')
                                    .addClass('bgcardmini')
                                    .html(fc.suitlk)
                            )
                        })
                        .appendTo('#deck')
                }
            });
        }

        var collbtn = $('<div>')
            .hide()
            .addClass('collectbtn')
            .appendTo('#deck')
            .fadeIn(100);


        //----------------------------------------------------------------
        //TEST CODE FOR WAR

        player1card.value = player2card.value;

        //END TEST CODE
        //----------------------------------------------------------------

        if (player1card.value === player2card.value) {
            gotowar();
            collbtn.append(
                $('<div>')
                    .addClass('flipbtn')
                    .html('go to war!')
            );
        }
        if (player1card.value > player2card.value) {
            collbtn.html('player 1 wins this card!')
        }
        if (player1card.value < player2card.value) {
            collbtn.html('player 2 wins this card!');
        }
    }

    function checkcards() {
        cardpickone = deck[Math.round(Math.random() * 51)];
        cardpicktwo = deck[Math.round(Math.random() * 51)];
        if (cardpickone === cardpicktwo) {
            checkcards();
        } else {
            return;
        }
    };

    function dealtoplayers() {
        function p2() {
            for (var pd = 0; pd < deck.length; pd++) {
                p2deck.push(deck[pd]);
            }
            deck = [];
        }

        function p1() {
            for (var p = 0; p < 26; p++) {
                var randhalf = Math.round(Math.random() * (deck.length - 1));
                p1deck.push(deck[randhalf]);
                deck.splice(randhalf, 1);
            };
        }

        function shuffle() {
            deck.sort(() => Math.random() - 0.5);
            p1(), p2()
        }
        shuffle();
        makecards();
    }

    function makecards() {
        $('<div>')
            .addClass('dealbtn')
            .html('Play a Card')
            .appendTo('#deck')
            .on('tap click', function () {
                $('<div>')
                    .hide()
                    .addClass('cardind')
                    .addClass('cardlft')
                    .attr('id', 0)
                    .css('color', p1deck[0].color)
                    .html(p1deck[0].name + '&nbsp;' + p1deck[0].suitlk)
                    .append(
                        $('<div>')
                            .addClass('bgcard')
                            .html(p1deck[0].suitlk)
                    )
                    .show()
                    .css({
                        'left': '-100px',
                        'bottom': '-200px',
                        'top': '100vh'
                    })
                    .animate({
                        'left': '10vw',
                        'top': '1vh'
                    }, 200, function () {
                        cardsound1.play();
                    })
                    .appendTo('#deck');

                $('<div>')
                    .hide()
                    .addClass('cardind')
                    .addClass('cardrt')
                    .attr('id', 0)
                    .css('color', p2deck[0].color)
                    .html(p2deck[0].name + '&nbsp;' + p2deck[0].suitlk)
                    .append(
                        $('<div>')
                            .addClass('bgcard')
                            .html(p2deck[0].suitlk)
                    )
                    .show()
                    .css({
                        'right': '-100px',
                        'bottom': '-200px',
                        'top': '100vh'
                    })
                    .delay(300)
                    .animate({
                        'right': '10vw',
                        'top': '1vh'
                    }, 200, function () {
                        cardsound2.play();
                    })
                    .delay(500, function () {
                        resultedcard(p1deck[0], p2deck[0]);
                    })
                    .appendTo('#deck')
            });
    }

    checkcards(), dealtoplayers(), console.log(p1deck, p2deck);
});