const { Server } = require("ws");

const { delay } = require("./utlis/delay");

const PORT = process.env.PORT || 3000;

const wss = new Server({ port: PORT });

wss.on("connection", (ws) => {
    ws.on("message", async (data) => {
        const { username, message } = JSON.parse(data);

        let answerMessage = "Не понимаю тебя. Переформулируй вопрос.";
        if (username !== undefined) {
            answerMessage = `Привет, ${username}! Задавай вопросы!`;
        }

        await delay(2000);
        ws.send(JSON.stringify({ isPending: true }));

        await delay(2000);
        ws.send(JSON.stringify({ isPending: false, message: answerMessage }));
    });
});
