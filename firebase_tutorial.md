Tutorial súper básico y paso a paso para desplegar un sitio web estático simple (un `index.html`, un `style.css` y un `script.js`) usando Firebase Hosting.

**Objetivo:** Subir tus archivos HTML, CSS y JS a internet para que cualquiera pueda visitarlos usando una URL proporcionada por Firebase.

**Requisitos Previos:**

1.  **Una cuenta de Google:** Necesitarás una cuenta de Google (como Gmail) para usar Firebase.
2.  **Node.js y npm:** Firebase utiliza herramientas que se instalan con npm (Node Package Manager), que viene con Node.js.
    *   Abre tu terminal o símbolo del sistema.
    *   Verifica si los tienes instalados escribiendo: `node -v` y `npm -v`.
    *   Si no los tienes, descárgalos e instálalos desde [nodejs.org](https://nodejs.org/).

---

**¡Empecemos!**

**Paso 1: Crear un Proyecto en Firebase ️**

1.  Ve a la [Consola de Firebase](https://console.firebase.google.com/).
2.  Inicia sesión con tu cuenta de Google.
3.  Haz clic en "**Agregar proyecto**" o "**Crear un proyecto**".
4.  Dale un nombre a tu proyecto (ej. `mi-primer-sitio-web`). Firebase te sugerirá un ID único (anótalo si quieres, pero normalmente no lo necesitarás recordar ahora). Haz clic en "**Continuar**".
5.  Firebase te preguntará si quieres habilitar Google Analytics. Para este tutorial básico, **puedes desactivarlo** si quieres simplificar. Haz clic en "**Crear proyecto**".
6.  Espera un momento mientras Firebase configura tu nuevo proyecto. Cuando esté listo, haz clic en "**Continuar**". ¡Ya estás en el panel de tu proyecto Firebase!

**Paso 2: Instalar las Herramientas de Firebase (Firebase CLI) ️**

1.  Abre tu **terminal** (en Mac/Linux) o **Símbolo del sistema/PowerShell** (en Windows).
2.  Escribe el siguiente comando y presiona Enter. Esto instala las herramientas de Firebase globalmente en tu sistema:
    ```bash
    npm install -g firebase-tools
    ```
3.  Espera a que termine la instalación. Puedes verificar que se instaló correctamente escribiendo:
    ```bash
    firebase --version
    ```
    Deberías ver un número de versión.

**Paso 3: Iniciar Sesión en Firebase desde la Terminal**

1.  En la misma terminal, escribe el siguiente comando:
    ```bash
    firebase login
    ```
2.  Esto abrirá una ventana en tu navegador pidiéndote que inicies sesión con tu cuenta de Google y que permitas a Firebase CLI acceder a tu cuenta.
3.  Elige la misma cuenta de Google que usaste para crear el proyecto en el Paso 1.
4.  Haz clic en "**Permitir**".
5.  Deberías ver un mensaje de éxito en la página web y también en tu terminal ("Success! Logged in as tu_email@gmail.com").

**Paso 4: Preparar los Archivos de tu Sitio Web Localmente**

1.  Crea una carpeta en tu computadora donde guardarás los archivos de tu sitio web. Llámala como quieras, por ejemplo: `mi-sitio-estatico`.
2.  **Dentro** de esa carpeta (`mi-sitio-estatico`), crea otra carpeta llamada `public`. **¡Es importante!** Firebase buscará tus archivos aquí por defecto.
3.  **Dentro de la carpeta `public`**, crea tus tres archivos:
    *   `index.html`:
        ```html
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mi Sitio Estático</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>¡Hola, Firebase!</h1>
            <p>¡Mi sitio web está en vivo!</p>

            <script src="script.js"></script>
        </body>
        </html>
        ```
    *   `style.css`:
        ```css
        body {
            font-family: sans-serif;
            background-color: #f0f0f0;
            color: #333;
        }

        h1 {
            color: firebrick;
        }
        ```
    *   `script.js`:
        ```javascript
        console.log("¡El script se cargó correctamente!");
        alert("¡Bienvenido a mi sitio desplegado en Firebase!");
        ```
4.  Tu estructura de carpetas debería verse así:
    ```
    mi-sitio-estatico/
    └── public/
        ├── index.html
        ├── style.css
        └── script.js
    ```

**Paso 5: Inicializar Firebase en tu Carpeta de Proyecto**

1.  **MUY IMPORTANTE:** En tu terminal, **navega hasta la carpeta principal de tu proyecto** (la que llamaste `mi-sitio-estatico`, NO la carpeta `public`). Usa el comando `cd` (change directory). Por ejemplo:
    ```bash
    cd ruta/a/tu/carpeta/mi-sitio-estatico
    ```
2.  Una vez que estés **DENTRO** de la carpeta `mi-sitio-estatico` en tu terminal, ejecuta el siguiente comando:
    ```bash
    firebase init
    ```
3.  Esto iniciará un proceso interactivo en la terminal. Responde a las preguntas así:
    *   "Are you ready to proceed? (Y/n)" -> Escribe `Y` y presiona Enter.
    *   "Which Firebase features do you want to set up for this folder?" -> Usa las flechas del teclado para moverte hacia abajo hasta `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`. Presiona la **barra espaciadora** para seleccionarlo (aparecerá un asterisco `*`). Luego presiona Enter.
    *   "Please select an option:" -> Elige `Use an existing project` y presiona Enter.
    *   Selecciona el nombre del proyecto que creaste en Firebase en el Paso 1 (ej. `mi-primer-sitio-web [...]`) de la lista usando las flechas y presiona Enter.
    *   "What do you want to use as your public directory?" -> El valor por defecto es `public`. Como creamos una carpeta `public` en el Paso 4, simplemente presiona Enter para aceptar el valor por defecto.
    *   "Configure as a single-page app (rewrite all urls to /index.html)? (y/N)" -> Para este sitio básico, no es necesario. Escribe `N` y presiona Enter.
    *   "Set up automatic builds and deploys with GitHub? (y/N)" -> Para este tutorial básico, no lo necesitamos. Escribe `N` y presiona Enter.
4.  Firebase creará dos archivos en tu carpeta `mi-sitio-estatico`:
    *   `firebase.json`: Contiene la configuración de Hosting (le dice a Firebase que tu carpeta pública es `public`).
    *   `.firebaserc`: Guarda la información sobre qué proyecto de Firebase está vinculado a esta carpeta.

**Paso 6: Desplegar tu Sitio Web**

1.  ¡Ya casi está! Asegúrate de que sigues en la carpeta `mi-sitio-estatico` en tu terminal.
2.  Ejecuta el comando de despliegue:
    ```bash
    firebase deploy --only hosting
    ```
    *   `--only hosting` le dice a Firebase que solo quieres desplegar la parte de Hosting (si tuvieras otras funciones de Firebase configuradas).
3.  Firebase comenzará a subir los archivos de tu carpeta `public` a sus servidores.
4.  Cuando termine, verás un mensaje de éxito como:
    ```
    ✔  Deploy complete!

    Project Console: https://console.firebase.google.com/project/TU_ID_DE_PROYECTO/overview
    Hosting URL: https://TU_ID_DE_PROYECTO.web.app
    ```

**Paso 7: ¡Visita tu Sitio Web en Vivo!**

1.  Copia la `Hosting URL` que te dio la terminal en el paso anterior (la que termina en `.web.app`).
2.  Pégala en tu navegador web y presiona Enter.
3.  **¡Felicidades!** Deberías ver tu archivo `index.html` con el título "¡Hola, Firebase!", el estilo aplicado desde `style.css`, y deberías recibir una alerta (`alert`) de tu archivo `script.js`. También puedes abrir la consola de desarrollador de tu navegador (usualmente con F12) para ver el mensaje de `console.log`.

---

**¿Y si quiero actualizar mi sitio?**

¡Es muy fácil!

1.  Modifica los archivos (`index.html`, `style.css`, `script.js`) dentro de tu carpeta `public` local.
2.  Abre la terminal, asegúrate de estar en la carpeta `mi-sitio-estatico`.
3.  Ejecuta de nuevo el comando de despliegue:
    ```bash
    firebase deploy --only hosting
    ```
4.  Firebase subirá solo los archivos que cambiaron. Refresca tu navegador en la `Hosting URL` y verás los cambios.
