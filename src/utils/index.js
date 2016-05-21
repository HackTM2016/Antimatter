export const size = { width: window.innerWidth, height: window.innerHeight };

export const stats = { level: 0, score: 0 };

export const handleFoeKill = (bullet, foe) => {
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