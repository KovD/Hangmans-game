
const connectServer = () => {
    client = new WebSocket(adress);

    client.onopen = function() {
        client.send(JSON.stringify(playerData));
        console.log('Player data sent:', playerData);
    };

    client.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.leaderboard) {
            console.log('Leaderboard:', data.leaderboard); 
            updateLeaderboard(data.leaderboard);
        }
    };

    client.onerror = function(error) {
        console.error('WebSocket hiba: ', error);
    };
};

const updateLeaderboard = (leaderboard) => {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';

    leaderboard.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${player.name} - ${player.score} pont`;
        leaderboardElement.appendChild(listItem);
    });
};
