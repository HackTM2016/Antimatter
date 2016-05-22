export const size = { width: 910, height: 910 };

export const stats = { level: 0, score: 0 };

export const handleFoeKill = (bullet, foe) => {

    stats.score += 1000;

    bullet.kill();
    foe.die();
};

export const handleShipHit = (ship, bullet) => {
    ship.hit();
    bullet.kill();
};

export const handleFoeShipCollision = (ship, foe) => {
    foe.destroy();
    ship.hit();
};

export const handleBulletCollision = (enemyBullet, shipBullet) => {
    enemyBullet.kill();
    shipBullet.kill();
};

export const updateScore = () => {
    let score = document.getElementById('score');
    score.innerText = stats.score;
};

export const updateHealth = (shipHealth) => {
    let health = document.getElementById('health');
    health.innerText = shipHealth;
};

export const updateWaveTime = (time) => {
    let nextwave = document.getElementById('nextwave');
    nextwave.innerText = time;
};

export const restartScore = () => {
    stats.level = 0;
    stats.score = 0;
};

export const handleShieldHit = (shield, bullet) => {
    if (shield.active) {
        shield.hit();
        bullet.kill();
    }
};

export const handleShieldCollision = (shield, foe) => {
    if (shield.active) {
        foe.die();
    }
};

export const handleShield = (shield, now) => {
    if (shield.active && shield.time + 3000 <= now) {
        shield.deactivate();
    }
};
