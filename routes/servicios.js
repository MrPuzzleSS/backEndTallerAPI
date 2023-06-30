const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{servicioGet, servicioPost, servicioPut, servicioDelete} = require('../controllers/servicio')
route.get('/', servicioGet)
route.post('/', servicioPost )
route.put('/', servicioPut )
route.put('/', servicioDelete )
route.delete('/', servicioDelete)
module.exports = route