// --- Elementos del DOM ---
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const pairsFoundDisplay = document.getElementById('pairs-found');
const totalPairsDisplay = document.getElementById('total-pairs');
const playAgainButton = document.getElementById('playAgainButton');
const winMessage = document.getElementById('win-message');
const fallo = document.getElementById("fallo");
const time = document.getElementById("time");

// --- Variables del Juego ---
// Usamos emojis para que sea más visual y divertido
const cardSymbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝'];
const animalSymbols = ['🫎', '🐔', '🐯', '🕷️', '🐘', '🐷', '🐵', '🐧'];
const foodSymbols = ['🍕', '🌭', '🥪', '🥩', '🧀', '🥖', '🍰', '🥨']
let cards = []; // Array para guardar la información de cada carta
let flippedCards = []; // Almacena las 2 cartas volteadas temporalmente
let matchedPairs = 0;
let moves = 0;
let lockBoard = false; // Bloquea el tablero mientras se comparan o voltean cartas
let totalPairs = foodSymbols.length;
let max_moves;
let timer;
let mensaje;
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
    
    winMessage.textContent = '';
    // Duplica los símbolos para tener pares y barájalos
    const shuffledSymbols = shuffle([...foodSymbols, ...foodSymbols]);
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
        fallido(`Oh, no! No coinciden🙄`);
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
        
    }, 1000);
     // Retraso de 1 segundo para ver las cartas
}

//Esa función tiene que mostrarse cuando se volteen las cartas que no son iguales.
//La función unflipCards solo sirve para que vuelvan a voltearse las cartas escogidas 
//(las que no son iguales). 
// Si llamamos a la función fallido en el unflipCards, el texto se queda y no desaparece.
//Usarmeos un parametro y lo meteremos en el textContent de fallo.
function fallido(mensaje){
    fallo.textContent = mensaje;
    fallo.style.display = 'block';
    setTimeout(() => {
        fallo.style.display = 'none';
    }, 1000)
    
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
    handleLoss();
}

function handleLoss(){
    if (moves === max_moves){
        endGame();
    }
}
// Comprobar si se han encontrado todos los pares
function checkWinCondition() {
    if (matchedPairs === totalPairs) {
        winMessage.style.display = 'block';
        playAgainButton.style.display = 'inline-block';
        winMessage.textContent = `¡Felicidades! ¡Has encontrado todos los pares!`;
        clearInterval(timer);
    }
    /*if(moves === max_moves){
        endGame();
    }*/
}

function endGame(){
    console.log("Se acabo el juego");
    winMessage.style.display = 'block';
    winMessage.textContent = `Has perdido, vuelve a intentarlo`
    playAgainButton.style.display = 'inline-block';
    lockBoard = true;
    clearInterval(timer);
}

/*const tiempo = setInterval(function startTimer(){
    document.getElementById("time").textContent = "Tiempo: " + elapsed_seconds + " segundos";
    elapsed_seconds++;
    if (elapsed_seconds === 31){
        clearInterval(tiempo);
        endGame();
    }
}, 1000)*/

//La funcion startTimer tiene que tener un setInterval dentro junto con la variable
//del timer que está en la función createBoard
function startTimer(){
clearInterval(timer);
timer = setInterval(() => {
    elapsed_seconds++;
    document.getElementById("time").textContent = `Tiempo: ${elapsed_seconds}`;
    if (elapsed_seconds === 300){
        endGame();
    }
    }, 1000);
}

// Iniciar o reiniciar el juego
function startGame() {
    // Resetear variables
    moves = 0;
    max_moves = 15;
    matchedPairs = 0;
    flippedCards = [];
    cards = [];
    lockBoard = false;
    elapsed_seconds = 0;
    // Resetear UI
    movesDisplay.textContent = moves;
    pairsFoundDisplay.textContent = matchedPairs;
    winMessage.style.display = 'none';
    winMessage.textContent = '';
    playAgainButton.style.display = 'none';
    startTimer();

    // Crear nuevo tablero
    createBoard();
}

// --- Event Listeners ---
playAgainButton.addEventListener('click', startGame);

// --- Iniciar el juego al cargar la página ---
startGame();