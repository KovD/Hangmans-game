const WebSocket = require('ws');
const { readLeaderboard, updateLeaderboard } = require('./lb_manager');

const PORT = 5000;
const server = new WebSocket.Server({ port: PORT });

server.on('connection', (ws) => {
    ws.on('message', async (msg) => {
        const data = JSON.parse(msg);
        console.log('Player: ' + data.name + '\n' + 'Score: ' + data.score);

        try {
            let leaderboard = await readLeaderboard();

            console.log(leaderboard);
            
            const existingPlayerIndex = leaderboard.findIndex(player => player.id === data.id);
            if (existingPlayerIndex !== -1) {
                leaderboard[existingPlayerIndex].score = data.score;
            } else {
                leaderboard.push(data);
            }
            
            leaderboard.sort((a, b) => b.score - a.score);
            const top5 = leaderboard.slice(0, 5);

            await updateLeaderboard(leaderboard);

            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ leaderboard: top5 }));
                }
            });
        } catch (err) {
            console.error('Error handling leaderboard:', err);
        }
    });
});

console.log(new Date() + " Server running on port " + PORT);
