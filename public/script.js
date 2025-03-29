// --- Elementos del DOM ---
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const pairsFoundDisplay = document.getElementById('pairs-found');
const totalPairsDisplay = document.getElementById('total-pairs');
const playAgainButton = document.getElementById('playAgainButton');
const winMessage = document.getElementById('win-message');

// --- Variables del Juego ---
// Usamos emojis para que sea más visual y divertido
const cardSymbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝'];
let cards = []; // Array para guardar la información de cada carta
let flippedCards = []; // Almacena las 2 cartas volteadas temporalmente
let matchedPairs = 0;
let moves = 0;
let lockBoard = false; // Bloquea el tablero mientras se comparan o voltean cartas
let totalPairs = cardSymbols.length;
let max_moves;
// --- Funciones ---

// Barajar un array (Algoritmo Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio moderno
    }
    console.log(array);
    return array;
}

// Crear el tablero de juego
function createBoard() {
    // Duplica los símbolos para tener pares y barájalos
    const shuffledSymbols = shuffle([...cardSymbols, ...cardSymbols]);
    totalPairsDisplay.textContent = totalPairs; // Muestra el total de pares
    gameBoard.innerHTML = ''; // Limpia el tablero anterior

    shuffledSymbols.forEach(symbol => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        // Guardamos el símbolo en un atributo data-* para fácil acceso
        cardElement.dataset.symbol = symbol;

        // Crear caras de la carta
        cardElement.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">${symbol}</div>
        `;

        // Añadir evento de clic
        cardElement.addEventListener('click', handleCardClick);

        gameBoard.appendChild(cardElement);
        cards.push(cardElement); // Guarda la referencia al elemento
    });
}

// Manejar el clic en una carta
function handleCardClick() {
    // Ignora clics si el tablero está bloqueado, la carta ya está volteada o emparejada
    if (lockBoard || this.classList.contains('is-flipped') || flippedCards.length >= 2) {
        return;
    }

    const clickedCard = this;
    clickedCard.classList.add('is-flipped');
    flippedCards.push(clickedCard);

    // Si se han volteado dos cartas
    if (flippedCards.length === 2) {
        lockBoard = true; // Bloquea el tablero
        incrementMoves();
        checkForMatch();
    }
}

// Comprobar si las dos cartas volteadas coinciden
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;

    if (symbol1 === symbol2) {
        // Es un par
        disableCards();
    } else {
        // No es un par
        unflipCards();
    }
}

// Marcar las cartas como emparejadas y desbloquear
function disableCards() {
    flippedCards.forEach(card => {
        card.classList.add('is-matched');
        // Opcional: quitar el listener para que no se pueda volver a clickar
        // card.removeEventListener('click', handleCardClick);
        //ponemos en simbolo en la carta para que se vea la fruta ya macheada
        card.innerHTML = card.dataset.symbol; //SOLUCION AL EJERCICIO 0 *************
    });
    matchedPairs++;
    pairsFoundDisplay.textContent = matchedPairs;
    resetFlippedCards();
    checkWinCondition();
}

// Voltear las cartas de nuevo si no coinciden (con un retraso)
function unflipCards() {
    setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('is-flipped'));
        resetFlippedCards();
    }, 1000); // Retraso de 1 segundo para ver las cartas
}

// Limpiar el array de cartas volteadas y desbloquear tablero
function resetFlippedCards() {
    flippedCards = [];
    lockBoard = false;
}

// Incrementar el contador de movimientos
function incrementMoves() {
    moves++;
    movesDisplay.textContent = moves;
}

// Comprobar si se han encontrado todos los pares
function checkWinCondition() {
    if (matchedPairs === totalPairs) {
        winMessage.style.display = 'block';
        playAgainButton.style.display = 'inline-block';
    }
}

// Iniciar o reiniciar el juego
function startGame() {
    // Resetear variables
    moves = 0;
    max_moves = 30;
    matchedPairs = 0;
    flippedCards = [];
    cards = [];
    lockBoard = false;

    // Resetear UI
    movesDisplay.textContent = `${moves}/${max_moves}`;
    pairsFoundDisplay.textContent = matchedPairs;
    winMessage.style.display = 'none';
    playAgainButton.style.display = 'none';

    // Crear nuevo tablero
    createBoard();
}

// --- Event Listeners ---
playAgainButton.addEventListener('click', startGame);

// --- Iniciar el juego al cargar la página ---
startGame();