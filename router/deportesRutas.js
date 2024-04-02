const express = require('express');
const router = express.Router();
const controller = require('../controller/deportesController');

router.post('/agregar', controller.agregarDeporte);
router.get('/deportes', controller.obtenerDeportes);
router.put('/editar/:nombre', controller.editarDeporte);
router.delete('/eliminar/:nombre', controller.eliminarDeporte);

module.exports = router;
