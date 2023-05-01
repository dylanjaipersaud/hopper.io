import escape from 'lodash/escape';

const leaderboard = document.getElementById('leaderboard');
const rows = document.querySelectorAll('#leaderboard table tr');

export function updateLeaderboard(data){
    // Updates the client's score as the game progresses
    for(let i = 0; i < data.length; i++){
        rows[i+1].innerHTML = `<td>${escape(data[i].username.slice(0, 15)) || 'Nameless Hopper'}</td><td>${data[i].score}</td>`;
    }

    // 
    for(let i = 0; i < 5; i++){
        rows[i+1].innerHTML = `<td>-</td><td>-</td>`;
    }
}

// Makes the leaderboard hidden to the user
export function setLeaderboardHidden(hidden){
    if(hidden){
        leaderboard.classList.add('hidden');
    }
    else{
        leaderboard.classList.remove('hidden');
    }
}