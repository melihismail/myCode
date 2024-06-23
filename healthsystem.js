const playerHealthBar = document.getElementById("health-bar");
const enemyHealthBar = document.getElementById("enemy-health-bar");

const healButton = document.getElementById("heal-self");
const damageButton = document.getElementById("take-damage");
const regenButton = document.getElementById("regen-self");
const attackButton = document.getElementById("attack-enemy");
const healEnemyButton = document.getElementById("heal-enemy")


console
damageButton.addEventListener('click', () => player1.takeDamage(5));
healButton.addEventListener('click', () => player1.heal(5));
regenButton.addEventListener('click', () => player1.regen(5, 5));
attackButton.addEventListener('click', () => player1.weakAttack(enemy1)); // player1 attacks enemy1
healEnemyButton.addEventListener('click', () => enemy1.regen(500, 50));


class HealthSystem {
    constructor(maxHealth, progressBar) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.progressBar = progressBar;
        this.updateProgressBar();
    }
   
    takeDamage(amount) {
        this.currentHealth -= amount;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }
        this.updateProgressBar();
     

        if (this.currentHealth < 50) {
            console.log("You're about to die");
        }
        console.log(`Took ${amount} damage. Current health: ${this.currentHealth}`);
    }

    heal(amount) {
        this.currentHealth += amount;
      
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
        this.updateProgressBar("heal");
        console.log(`Healed ${amount}. Current health: ${this.currentHealth}`);
    }

    regen(amount, rate) {
        const regenRate = rate; // Health points to regen per interval
        const interval = 1000; // Interval duration in milliseconds

        const regenInterval = setInterval(() => {
            if (this.currentHealth < this.maxHealth && amount > 0) {
                this.currentHealth += regenRate;
                amount -= regenRate;
                if (this.currentHealth > this.maxHealth) {
                    this.currentHealth = this.maxHealth;
                }
                this.updateProgressBar("regen");
                console.log(`Regenerating... Current health: ${this.currentHealth}`);
            } else {
                clearInterval(regenInterval);
                console.log('Regeneration complete');
            }
        }, interval);
    }

    isAlive() {
        return this.currentHealth > 0;
    }

    updateProgressBar(acitonHandler) {
        
        
        const x = this.progressBar;
      
        
        x.style.width = this.currentHealth + "%"

        const dontShow = acitonHandler != "regen" && acitonHandler != "heal"

        if (dontShow) {
            const y = document.getElementById("hit-text")
        y.classList.add("show")
        setTimeout(() => {
            y.classList.remove("show")
        }, 300)

        }

        
        
    }
}

class DamageSystem {
    constructor(damage, strength = 10) {
        this.damage = damage;
        this.strength = strength;
    }

    weakAttack(enemy) {
        const hitTaken = document.getElementById("hit-text");
        var x = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4];
        var y = Math.floor(Math.random() * x.length)
        const totalDamage = this.damage + this.strength + x[y];
        enemy.takeDamage(totalDamage);
        console.log(totalDamage)
        hitTaken.innerText = totalDamage
    }
}

class Player {
    constructor(maxHealth, damage, strength, progressBar) {
        this.healthSystem = new HealthSystem(maxHealth, progressBar);
        this.damageSystem = new DamageSystem(damage, strength);
    }

    takeDamage(amount) {
        this.healthSystem.takeDamage(amount);
    }

    heal(amount) {
        this.healthSystem.heal(amount);
    }

    regen(amount, rate) {
        this.healthSystem.regen(amount, rate);
    }

    isAlive() {
        return this.healthSystem.isAlive();
    }

    weakAttack(enemy) {
        this.damageSystem.weakAttack(enemy.healthSystem);
    }
}


const player1 = new Player(100, 5, 10, playerHealthBar); // Create player with HealthSystem, DamageSystem, and progressBar
const enemy1 = new Player(100, 5, 10, enemyHealthBar); // Create enemy with HealthSystem, DamageSystem, and progressBar
