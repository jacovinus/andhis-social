/**
 * Message Controller
 */
// cargar modelos
const User = require('../models/user');
const Follow = require('../models/follow');

// cargar modulos node
const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');
const Message = require('../models/message');

// funcion de pruebas para mensaje
const pruebasMessage = (req,res) => {
    let UserId = req.user.sub;
    if (!UserId) return res.status(500).send({message : 'No esta autorizado a realizar esta peticion'});
    if(UserId) return res.status(200).send({message : 'metodo de pruebas de mensajes en funcionamiento'});
    }

// Guardar mensaje
const saveMessage = (req, res) => {
    let params = req.body;
    let UserId = req.user.sub;
    if(!params.text && !params.receiver) return res.status(500).send({message : 'Debe completar los campos para enviar el mensaje'});
    if (!params.text || !params.receiver) return res.status(404).send({message: 'Debe completar los campos para enviar el mensaje'});
    if(params.text && UserId && params.receiver){
        let message = new Message();
        message.emitter = UserId;
        message.receiver = params.receiver;
        message.text = params.text;
        message.created_at = moment().unix();
        message.viewed = 'false';
        message.save((err,messageStored) => {
            if(err) return res.status(500).send({message:'Error al enviar el mensaje'});
            if (!messageStored) return res.status(404).send({ message: 'No se ha podido enviar el mensaje'});
            return res.status(200).send({message : messageStored});
             });
         }
    }

// Mensajes recibidos
const getMessagesReceived = (req, res) => {
    let UserId = req.user.sub;
    let params = req.params;
    let page = params.page ? params.page : 1;
    let itemsPerPage = 6;
    Message.find({receiver: UserId }).populate('emitter','_id name surname nick image').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
    if(err) return res.status(500).send({message: 'Error al obtener los mensajes recibidos'});
    if(!messages) return res.status(404).send({message: 'Este usuario no posee mensajes recibidos'});
    if(messages){
        return res.status(200).send({ messages, total, page, pages: Math.ceil(total / itemsPerPage) });
    }

        });
    }
// Mensajes enviados
const getMessagesSent = (req, res) => {
    let UserId = req.user.sub;
    let params = req.params;
    let page = params.page ? params.page : 1;
    let itemsPerPage = 6;
    Message.find({ emitter: UserId}).populate('receiver', '_id name surname nick image').sort('-created_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) return res.status(500).send({ message: 'Error al obtener los mensajes enviados'});
        if (!messages) return res.status(404).send({ message: 'Este usuario no posee mensajes enviados'});
       if(messages){
        return res.status(200).send({ messages, total, page, pages: Math.ceil(total / itemsPerPage) });
       }
        
        });
    }
// Mensajes no leidos
const getMessagesUnread = (req, res)=>{
    let UserId = req.user.sub;
    Message.find({receiver : UserId, viewed : 'false'}).exec((err,count)=>{
    if(err) return res.status(500).send({message: 'No se encontraron los mensajes no leidos'});
    return res.status(200).send({'unread' : count});
    });
    }

// Leer mensajes
const setMessagesRead = (req,res) => {
    let UserId = req.user.sub;
    Message.update({receiver : UserId, viewed: 'false'},{viewed : 'true'},{"multi" : true}).exec((err, messageUpdated)=>{
    if (err) return res.status(500).send({message: 'no se pudieron marcar los mensajes como leidos'});
    if (!messageUpdated) return res.status(404).send({ message: 'No se encontraron los mensajes no leidos'});
    return res.status(200).send({messages : messageUpdated});
        });   
    }

// Exportar metodos
module.exports = {
    saveMessage,
    pruebasMessage,
    getMessagesReceived,
    getMessagesSent,
    getMessagesUnread,  
    setMessagesRead
}