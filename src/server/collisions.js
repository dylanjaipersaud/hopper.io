const Constants = require('../shared/constants');


function applyCollisions(player1, player2) {

    if (
        player1.distanceTo(player2) <= Constants.PLAYER_RADIUS * 2
    ) {
        player2.takeBulletDamage();
        return true;
    }
    return false;
}

module.exports = applyCollisions;
