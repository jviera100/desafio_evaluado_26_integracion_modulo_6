const express = require('express');
const bodyParser = require('body-parser'); // Módulo para analizar el cuerpo de las solicitudes HTTP
const router = require('./router/deportesRutas'); // Importa el enrutador de las rutas de deportes
const chalk = require('chalk'); // Módulo para dar estilo a las impresiones en la consola
const path = require('path');

const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Puerto en el que se ejecutará el servidor

app.use(bodyParser.urlencoded({ extended: true })); // Analiza los cuerpos de las solicitudes codificados en URL
app.use(bodyParser.json()); // Analiza los cuerpos de las solicitudes en formato JSON
app.use(express.static(path.join(__dirname, 'assets'))); // Ruta estática para servir archivos estáticos
app.use(router); // Utiliza el enrutador de las rutas de deportes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Envía el archivo HTML al visitar la ruta raíz
});

app.listen(PORT, () => { 
    console.log(chalk.underline.bgCyanBright.magenta.bold.italic(`🔥🔥🔥🔥🔥Servidor corriendo en el puerto🔥🔥🔥🔥🔥http://localhost:${PORT}`));
});
