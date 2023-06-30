//Importar paquetes requeridos de node
const { response } = require('express');

//Importacion de los modelos 
const Servicio = require('../models/servicio');

//insercion, modificacion de datos

//consultar
const servicioGet = async (req, res = response) => {
  const { servicio } = req.body;
  let servicios;
  if (servicio) {
    // Si se proporciona el parámetro "nombre", filtrar por ese nombre
    servicios = await Servicio.find({ servicio: servicio });
  } else {
    // Si no se proporciona el parámetro "nombre", obtener todos los usuarios
    servicios = await Servicio.find();
  }

  res.json({
    servicios
  });
};


const servicioPost = async (req, res = response) => {
  const {servicio, valor} = req.body;
  let mensaje = '';

  try {
    const servicios = new Servicio({servicio:servicio, valor:valor});
    await servicios.save();

    mensaje = 'El registro se realizó correctamente';
    // Enviar la respuesta de éxito
    return res.status(200).json({ mensaje });
    
  } catch (error) {
    // Manejo de errores
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyValue)[0];
      const mensajeError = `El campo ${campoDuplicado} ya existe.`;
      return res.status(409).json({
        error: 'Clave duplicada',
        message: mensajeError
      });
    } else if (error.name === 'ValidationError') {
      const mensajesError = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        error: 'ValidationError',
        messages: mensajesError
      });
    } else {
      console.error(error);
      return res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }
};

const servicioPut = async (req, res = response) => {
  const { servicio, valor } = req.body;
  let mensaje = '';

  try {
    const servicios = await Servicio.findOneAndUpdate(
      { servicio: servicio },
      { valor:valor }
    );

    if (!servicios) {
      mensaje = 'El estudiante no existe';
      return res.status(404).json({ mensaje });
    }

    mensaje = 'La modificación se efectuó correctamente';
    return res.status(200).json({ mensaje });
  } catch (error) {
    mensaje = 'Se presentaron problemas en la modificación';
    return res.status(500).json({ mensaje });
  }
};

const servicioDelete = async (req, res = response) => {
  const { servicio } = req.body;
  let mensaje = '';

  try {
    const servicios = await Servicio.findOne({ servicio: servicio });
    if (servicios) {
      await Servicio.findOneAndDelete({ servicio: servicio });
      mensaje = 'La eliminacion fue exitosa';
    } else {
      mensaje = 'El estudiante no existe';
    }
  } catch (error) {
    mensaje = 'Error al eliminar el estudiante';
  }

  res.json({
    msg: mensaje
  });
};

module.exports = {
  servicioGet,
  servicioPost,
  servicioPut,
  servicioDelete
}
