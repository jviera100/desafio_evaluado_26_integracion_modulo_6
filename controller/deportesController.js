const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data', 'deportes.json');

// Función para leer los datos de deportes desde el archivo JSON
function leerDeportes() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (error) {
    console.error('Error al leer el archivo de deportes:', error);
    return [];
  }
}

// Función para escribir los datos de deportes en el archivo JSON
function escribirDeportes(deportes) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(deportes, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al escribir en el archivo de deportes:', error);
  }
}

// Exporta un objeto con métodos para manejar las solicitudes relacionadas con los deportes
module.exports = {
  // Método para agregar un deporte
  agregarDeporte(req, res) {
    const { nombre, precio } = req.body;
    const deportes = leerDeportes();
    deportes.push({ nombre, precio });
    escribirDeportes(deportes);
    res.send('Deporte agregado exitosamente.');
  },

  // Método para obtener todos los deportes
  obtenerDeportes(req, res) {
    const deportes = leerDeportes();
    res.json(deportes);
  },

  // Método para editar un deporte
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

  // Método para eliminar un deporte
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
