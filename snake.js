var start = false;
// var ans;
document.getElementById("gameoverid").style.display = "none";

function startgame() {
    if (start == false) {
        start = true;
        var lasttime = 0;
        const speed = 10;
        let cord = { x: 0, y: 0 };
        var lipd = cord;

        var snakedeath = new Audio("Graphics/Snake_death.mp3");
        var gamemusic = new Audio("Graphics/Snake_Music.mp3");
        const increasesnake = 1;
        var eatsound = new Audio("Graphics/eatsound.WAV");
        var score1 = 0;
        var score = document.getElementById("updatescore");
        const snakearray = [{
            x: 18,
            y: 16,

        }];
        document.getElementById("start").innerHTML = "Reset Game";
        let food = foodposition();
        const board = document.querySelector(".board");
        // const x = document.querySelector("remainingtime");
        document.getElementById("gameoverid").style.display = "none";
        document.getElementById("updatescore").innerHTML = score1;
        var requestid = 0;
        // x.innerHTML = y;
        function refresh(time) {
            var curr = (time - lasttime) / 1000;
            requestid = window.requestAnimationFrame(refresh);
            if (1 / speed > curr)
                return;
            lasttime = time;
            update();
            show();
            gamemusic.play();

            // console.log("hii");
        }
        window.requestAnimationFrame(refresh);
        // 


        function show() {
            showsnake();
            showapple();

        }

        function update() {
            board.innerHTML = "";
            move();
            eatfood();
        }

        function showapple() {
            var applevalue = document.createElement("div");
            applevalue.style.gridColumnStart = food.x;
            applevalue.style.gridRowStart = food.y;
            applevalue.classList.add("food");
            board.appendChild(applevalue);
        }

        function showsnake() {
            snakearray.forEach((value, index) => {
                var snakevalue = document.createElement("div");
                snakevalue.style.gridColumnStart = value.x;
                snakevalue.style.gridRowStart = value.y;
                snakevalue.style.transform = "rotate(0deg)";
                if (index == 0)
                    snakevalue.classList.add("head");
                if (cord.x == 1) { snakevalue.style.transform = "rotate(0deg)" } else if (cord.x == -1) {
                    snakevalue.style.transform = "rotate(0deg)";
                } else if (cord.y == 1) {
                    snakevalue.style.transform = "rotate(-90deg)";
                } else if (cord.y == -1) {
                    snakevalue.style.transform = "rotate(90deg)";
                }
                // if (index == snakearray.length - 1)
                //     snakevalue.classList.add("tail");
                snakevalue.classList.add("snakebody");
                board.appendChild(snakevalue);

            });
        }

        function move() {
            cord = getcord();
            // cordy = getcordy()
            for (var i = snakearray.length - 2; i >= 0; i--) {
                snakearray[i + 1] = {...snakearray[i] };
            }
            snakearray[0].x += cord.x;
            snakearray[0].y += cord.y;
            checkinvalidmove();
            // console.log(snakearray[snakearray.length - 1].x + " " + cord.y);
        }

        function getcord() {
            window.addEventListener("keydown", getevent => {
                switch (getevent.key) {
                    case 'ArrowUp':
                        if (lipd.y == 1) break;
                        cord = { x: 0, y: -1 }
                        break;
                    case 'ArrowDown':

                        if (lipd.y == -1) break;
                        cord = { x: 0, y: 1 }
                        break;

                    case 'ArrowLeft':
                        if (lipd.x == 1) break;
                        cord = { x: -1, y: 0 }
                        break;

                    case 'ArrowRight':
                        if (lipd.x == -1) break;
                        cord = { x: 1, y: 0 }
                        break;
                    case 'Space':
                        cord = { x: 0, y: 0 }
                        break;
                    default:
                        { cord = { x: 0, y: 0 } }
                }
            });
            lipd = cord;
            return cord;
        }

        function eatfood() {
            if (snakearray.length > 0) {
                if (snakearray[0].x == food.x && snakearray[0].y == food.y) {
                    // console.log(food.x + " " + food.y);
                    gamemusic.pause();
                    eatsound.play()
                    food = foodposition();

                    score1 += 1;
                    score.innerHTML = score1;
                    // eatsound.pause();
                    // gamemusic.play();
                    // food.x = 5;
                    // food.y = 5;
                    // food.x = a;
                    // food.y = b;
                    expandsnake(increasesnake);
                }
            }
        }

        function foodposition() {
            let a, b, c = true;
            // a = Math.ceil(36 * Math.random());
            // b = Math.ceil(32 * Math.random());
            while (c) {

                a = Math.ceil(45 * Math.random());
                b = Math.ceil(24 * Math.random());
                c = snakearray.some(ele => {
                    return ele.x == a && ele.y == b;
                })
            }
            return { x: a, y: b }
        }

        function expandsnake() {
            for (var i = 0; i < increasesnake; i++) {
                snakearray.push(snakearray[snakearray.length - 1]);
            }
        }

        function checkinvalidmove() {
            if (snakeout() || snakeintersect()) {
                // snakearray[0].x += cord.x;
                // snakearray[0].y += cord.y;
                window.cancelAnimationFrame(requestid);

                gamemusic.pause();
                snakedeath.play();
                document.getElementById("gameoverid").style.display = "block";
                document.getElementById("gameoverscore").innerHTML = score1;
                document.getElementById("start").innerHTML = "Start Game";
                snakearray.length = 0;
                food = 0;
                // var xx = 1;
                // location.reload();
                // alert("GameOver : You Loose");
            }
        }

        function snakeout() {
            return snakearray[0].x < 0 || snakearray[0].x > 45 || snakearray[0].y < 0 || snakearray[0].y > 24;
        }

        function snakeintersect() {
            for (i = 1; i < snakearray.length; i++) {
                if ((snakearray[0].x == snakearray[i].x) && (snakearray[0].y) == snakearray[i].y) {

                    return true;
                }
            }
        }
    } else {
        location.reload();
    }
}