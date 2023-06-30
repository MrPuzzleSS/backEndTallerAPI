const {Schema, model} = require('mongoose');

const ServicioSchema = Schema({
    servicio:{
        type:String,
        unique:true,
        required: [true, 'Se requiere el nombre del servicio']
    },
    valor:{
        type:Number,
        required: [true, 'Se requiere el valor del servicio']
    },
    fechaRegistro:{
        required: true,
        type:Date,
        default:Date.now
    }
})

module.exports = model ('Servicio', ServicioSchema);