
## JUEGO PAREJAS EJERCICIOS EXTRA SUPER FRESCOS


**Ejercicio 0** 
Que se vea la fruta al emparejar.

---

**Ejercicio 1: Límite de Movimientos**

*   **Enunciado:** Establece un número máximo de movimientos permitidos (por ejemplo, 30 movimientos). Si el jugador alcanza este límite *antes* de encontrar todos los pares, el juego termina, se muestra un mensaje de "¡Límite de movimientos alcanzado! Inténtalo de nuevo" y se bloquea el tablero (similar a como se hace al ganar, pero con un mensaje diferente). Asegúrate de que el contador de movimientos se muestre claramente (quizás como "Movimientos: X / 30").
    *   **Pista:** Define una constante `MAX_MOVES`. Comprueba el contador `moves` cada vez que se incrementa (`incrementMoves`) o después de comprobar un par (`checkForMatch`). Si se alcanza el límite, llama a una nueva función `handleLoss()` o similar.

---

**Ejercicio 2: Mensaje de "¡Casi!"**

*   **Enunciado:** Modifica la lógica para que, cuando el jugador voltee dos cartas que *no* son pareja (`unflipCards`), además de voltearlas de nuevo, se muestre un mensaje temporal (por ejemplo, durante 1 segundo, el mismo tiempo que tardan en voltearse) que diga "¡Oh no! No coinciden 😢". Este mensaje debe desaparecer después.
    *   **Pista:** Puedes usar un elemento `<p>` existente (como `#win-message`, cambiando su texto y visibilidad temporalmente) o añadir uno nuevo. Usa `setTimeout` para ocultar el mensaje después del tiempo deseado, coordinado con el `setTimeout` de `unflipCards`.

---

**Ejercicio 3: Cambio Fácil de Símbolos**

*   **Enunciado:** Refactoriza ligeramente el código para que sea muy fácil cambiar el conjunto de símbolos usados en las cartas. En lugar de tener los emojis directamente en el array `cardSymbols`, crea diferentes arrays de símbolos (por ejemplo, `animales = ['🐶', '🐱', ... ]`, `comida = ['🍕', '🍔', ... ]`) y una variable al inicio del script que seleccione cuál de estos arrays se usará para la partida actual (ej. `const currentSymbols = animales;`). Asegúrate de que la lógica que duplica y baraja (`createBoard`) use esta variable `currentSymbols`.
    *   **Pista:** Solo necesitas definir los nuevos arrays y cambiar la línea donde se inicializa `shuffledSymbols` en `createBoard` para que use `currentSymbols` en lugar de `cardSymbols`. También actualiza `totalPairs = currentSymbols.length;`.

---

## EJERCICIOS AVANZADOS!!!

**Ejercicio 1: Cronómetro de Partida**

*   **Enunciado:** Añade un cronómetro simple al juego. Debe empezar a contar (en segundos) cuando comience la partida (`startGame`) y detenerse cuando el jugador encuentre todos los pares (`checkWinCondition`). Muestra el tiempo transcurrido en pantalla (puedes añadir un nuevo elemento `<p>` en el HTML o usar `console.log` para simplificar si no quieres tocar HTML). Al reiniciar el juego, el cronómetro debe resetearse a 0 y empezar de nuevo.
    *   **Pista:** Necesitarás usar `setInterval()` para actualizar el tiempo cada segundo y `clearInterval()` para detenerlo. Guarda el ID devuelto por `setInterval` para poder detenerlo.

---

**Ejercicio 2: Bonificación por Rapidez (Opcional, un poco más avanzado)**

*   **Enunciado:** Si el jugador encuentra un par muy rápidamente después de haber encontrado el par anterior (por ejemplo, en menos de 3 segundos), muestra un mensaje de bonificación como "¡Rápido! ✨" junto al contador de pares encontrados.
    *   **Pista:** Necesitarás guardar la marca de tiempo (`Date.now()`) de cuándo se encontró el último par. Cuando se encuentre un nuevo par, compara la marca de tiempo actual con la guardada. Si la diferencia es menor al umbral (3000 ms), muestra el mensaje de bonificación (temporalmente, usando `setTimeout`). Actualiza la marca de tiempo guardada cada vez que se encuentre un par.