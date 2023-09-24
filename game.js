 const gameContainer = document.getElementById('game-container');
        const gallinas = document.querySelectorAll('.gallina');
        const scoreDisplay = document.getElementById('score');
        let score = 0;

        gallinas.forEach((gallina) => {
            createEgg(gallina);
        });

        function createEgg(gallina) {
            const egg = document.createElement('div');
            egg.classList.add('egg');
            egg.style.left = `${Math.random() * (gameContainer.clientWidth - 30)}px`;
            egg.style.top = `${gallina.offsetTop + 40}px`; // Posición inicial del huevo cerca de la gallina
            gameContainer.appendChild(egg);

            const fallInterval = setInterval(() => {
                const eggY = parseInt(egg.style.top) || 0;
                const maxY = gameContainer.clientHeight - egg.clientHeight;
                if (eggY >= maxY) {
                    clearInterval(fallInterval);
                    gameContainer.removeChild(egg);
                    createEgg(gallina); // Vuelve a crear el huevo
                } else {
                    egg.style.top = `${eggY + 2}px`; // Cambia la velocidad de caída ajustando el valor
                    const gallinaX = gallina.getBoundingClientRect().left + gallina.clientWidth / 2;
                    const gallinaY = gallina.getBoundingClientRect().top;
                    const eggX = egg.getBoundingClientRect().left + egg.clientWidth / 2;
                    const eggY = egg.getBoundingClientRect().top + egg.clientHeight;
                    if (Math.abs(gallinaX - eggX) < 25 && eggY >= gallinaY) {
                        clearInterval(fallInterval);
                        gameContainer.removeChild(egg);
                        score++; // Sumar puntos si la gallina atrapa un huevo
                        updateScore();
                        createEgg(gallina); // Vuelve a crear el huevo
                    }
                }
            }, 10); // Controla la velocidad de caída de los huevos
        }

        function updateScore() {
            scoreDisplay.textContent = `Puntuación: ${score}`;
        }
