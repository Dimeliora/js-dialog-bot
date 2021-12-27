const path = require("path");
const fs = require("fs");
const { Server } = require("ws");

const { getRandomNumber } = require("./utils/get-random-number");
const { delay } = require("./utils/delay");

const PORT = process.env.PORT || 3000;

const answersFilePath = path.resolve(__dirname, "data", "bot-answers.json");

const answersData = fs.readFileSync(answersFilePath);
answers = JSON.parse(answersData);
answersTemplate = new RegExp(Object.keys(answers).join("|"), "i");

const wss = new Server({ port: PORT });

wss.on("connection", (ws) => {
    ws.on("message", async (data) => {
        const { username, message } = JSON.parse(data);

        let answerMessage = "Не понимаю тебя. Переформулируй вопрос.";
        if (username !== undefined) {
            answerMessage = `Привет, ${username}! Задавай вопросы!`;
        } else {
            const keywordMatch = message.toLowerCase().match(answersTemplate);
            if (keywordMatch !== null) {
                answerMessage = answers[keywordMatch[0]];
            }
        }

        // Задержка 1-3 сек. перед началом ответа
        await delay(getRandomNumber(1000, 3000));
        ws.send(JSON.stringify({ isPending: true }));

        // Задержка 2-4 сек. перед ответом (время отображения preloader'а)
        await delay(getRandomNumber(2000, 4000));
        ws.send(JSON.stringify({ isPending: false, message: answerMessage }));
    });
});
