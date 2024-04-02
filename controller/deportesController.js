const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data', 'deportes.json');

function leerDeportes() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (error) {
    console.error('Error al leer el archivo de deportes:', error);
    return [];
  }
}

function escribirDeportes(deportes) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(deportes, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al escribir en el archivo de deportes:', error);
  }
}

module.exports = {
  agregarDeporte(req, res) {
    const { nombre, precio } = req.body;
    const deportes = leerDeportes();
    deportes.push({ nombre, precio });
    escribirDeportes(deportes);
    res.send('Deporte agregado exitosamente.');
  },

  obtenerDeportes(req, res) {
    const deportes = leerDeportes();
    res.json(deportes);
  },

  editarDeporte(req, res) {
    const { nombre } = req.params;
    const { precio } = req.body;
    const deportes = leerDeportes();
    const indice = deportes.findIndex(d => d.nombre === nombre);
    if (indice !== -1) {
      deportes[indice].precio = precio;
      escribirDeportes(deportes);
      res.send('Deporte editado exitosamente.');
    } else {
      res.status(404).send('Deporte no encontrado.');
    }
  },

  eliminarDeporte(req, res) {
    const { nombre } = req.params;
    const deportes = leerDeportes();
    const deportesFiltrados = deportes.filter(d => d.nombre !== nombre);
    if (deportes.length !== deportesFiltrados.length) {
      escribirDeportes(deportesFiltrados);
      res.send('Deporte eliminado exitosamente.');
    } else {
      res.status(404).send('Deporte no encontrado.');
    }
  }
};
