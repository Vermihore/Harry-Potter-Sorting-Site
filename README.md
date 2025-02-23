<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harry Potter House Sorting</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: url('https://wallpaperaccess.com/full/345842.jpg') no-repeat center center/cover;
            color: white;
            text-align: center;
            padding: 20px;
            overflow: hidden;
        }
        h1 {
            color: gold;
            font-size: 40px;
            text-shadow: 3px 3px 10px black;
        }
        .container {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
            margin-top: 20px;
        }
        .question {
            font-size: 22px;
            margin-bottom: 15px;
        }
        .answer-button {
            display: block;
            width: 100%;
            padding: 12px;
            background: goldenrod;
            color: black;
            font-size: 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 0;
            transition: 0.3s;
        }
        .answer-button:hover {
            background: orange;
            transform: scale(1.05);
        }
        .result {
            font-size: 26px;
            font-weight: bold;
            margin-top: 30px;
            color: gold;
            display: none;
            animation: pop 1.5s ease-in-out;
        }
        .sorting-message {
            font-size: 24px;
            color: yellow;
            margin-top: 20px;
            display: none;
        }
        .note {
            margin-top: 30px;
            font-size: 18px;
            color: white;
        }
    </style>
</head>
<body>
    <h1>✨ Harry Potter House Sorting ✨</h1>
    <div class="container">
        <div id="question-container" class="question"></div>
        <div id="answers"></div>
        <div id="sorting-message" class="sorting-message">🧙‍♂️ The Sorting Hat is thinking... 🤔</div>
        <div id="result-container" class="result"></div>
    </div>
    <div class="note">🔒 If you want to do this quiz again, you need a security code. So choose your answers wisely! 🧙‍♂️</div>
    <script>
        const houseLinks = {
            "Gryffindor": "https://chat.whatsapp.com/L4Qaj6wGWDj4Z2pg1c0HFG",
            "Slytherin": "https://chat.whatsapp.com/GJHwuwxuneW9AIJltVDdRm",
            "Ravenclaw": "https://chat.whatsapp.com/C1wWXVEEhghDAPCEeVOxCc",
            "Hufflepuff": "https://chat.whatsapp.com/G1rMtI8nGmG7kcMqkhfj0c"
        };

        if (localStorage.getItem("houseResult")) {
            let securityCode = prompt("You have already been sorted. Enter the security code to retake the quiz:");
            if (securityCode !== "2009") {
                document.getElementById("question-container").innerHTML = "You have already been sorted into: <strong>" + localStorage.getItem("houseResult") + "</strong>!";
                document.getElementById("result-container").innerHTML = `<a href="${localStorage.getItem("houseLink")}" target="_blank">Join your house group! 🏰</a>`;
                document.getElementById("result-container").style.display = "block";
            } else {
                localStorage.removeItem("houseResult");
                localStorage.removeItem("houseLink");
                location.reload();
            }
        } else {
            let scores = { Gryffindor: 0, Slytherin: 0, Ravenclaw: 0, Hufflepuff: 0 };
            const questions = [
                { question: "What is your favorite color?", answers: ["❤️ Red", "💚 Green", "💙 Blue", "💛 Yellow"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
                { question: "What trait do you value most?", answers: ["🔥 Bravery", "🐍 Ambition", "🧠 Intelligence", "🤝 Loyalty"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
                { question: "Which spell would you use in a duel?", answers: ["🪄 Expelliarmus", "🦹‍♂️ Avada Kedavra", "📖 Protego", "💫 Stupefy"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
                { question: "Pick a magical pet:", answers: ["🦉 Owl", "🐍 Snake", "🐱 Cat", "🦡 Badger"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
                { question: "Choose a magical artifact:", answers: ["🗡 Sword", "💍 Ring", "📜 Scroll", "🏺 Cup"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] } , { question: "🏅 Which Quidditch position would you play?", answers: ["🏹 Seeker", "🔨 Beater", "⚽ Chaser", "🛑 Keeper"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
            { question: "🧩 What type of puzzle do you enjoy the most?", answers: ["🦁 Riddles", "🐍 Strategy Games", "🦅 Logic Puzzles", "🦡 Jigsaw Puzzles"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
            { question: "🏰 Where would you spend your free time at Hogwarts?", answers: ["🔥 The Common Room", "📚 The Library", "⚗️ The Potions Dungeon", "🌳 The Greenhouse"], house: ["Gryffindor", "Ravenclaw", "Slytherin", "Hufflepuff"] },
            { question: "🛡 If faced with danger, what would you do?", answers: ["⚔️ Fight Bravely", "🕵️‍♂️ Plan an Escape", "🧐 Outsmart the Enemy", "🛑 Protect Others"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] } 
            ];

            let currentQuestion = 0;
            function loadQuestion() {
                if (currentQuestion >= questions.length) return;
                const questionObj = questions[currentQuestion];
                document.getElementById("question-container").innerHTML = questionObj.question;
                let answerButtons = "";
                questionObj.answers.forEach((answer, index) => {
                    answerButtons += `<button class='answer-button' onclick="selectAnswer('${questionObj.house[index]}')">${answer}</button>`;
                });
                document.getElementById("answers").innerHTML = answerButtons;
            }

            function selectAnswer(house) {
                scores[house]++;
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    loadQuestion();
                } else {
                    document.getElementById("answers").innerHTML = "";
                    document.getElementById("sorting-message").style.display = "block";
                    setTimeout(revealHouse, 3000);
                }
            }

           function revealHouse() {
                document.getElementById("sorting-message").style.display = "none";
                let sortedHouse = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
                document.getElementById("result-container").innerHTML = `🎉 You belong to <strong>${sortedHouse}</strong>! 🎊<br><a href="${houseLinks[sortedHouse]}" target="_blank">Join your house group! 🏰</a>`;
                document.getElementById("result-container").style.display = "block";
                localStorage.setItem("houseResult", sortedHouse);
                localStorage.setItem("houseLink", houseLinks[sortedHouse]);
            } 
            loadQuestion();
        }
    </script>
</body>
</html>
