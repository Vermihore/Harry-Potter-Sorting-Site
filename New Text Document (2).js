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
        { question: "Choose a magical artifact:", answers: ["🗡 Sword", "💍 Ring", "📜 Scroll", "🏺 Cup"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
        { question: "🏅 Which Quidditch position would you play?", answers: ["🏹 Seeker", "🔨 Beater", "⚽ Chaser", "🛑 Keeper"], house: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"] },
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
