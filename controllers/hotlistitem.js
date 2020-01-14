 /**
  * HotList Item Controller
  */

const User = require('../models/user');
const Publication = require('../models/publication');
const HotList = require('../models/hotlist');
const HotListItem = require('../models/hotlistitem');
const moment = require('moment');

const prueba = (req, res) => {
    let UserId = req.user.sub;
    if(!UserId) return res.status(500).send({message: 'Inicie sesion antes de utilizar este metodo'});
    return res.status(200).send({message: 'Metodo de pruebas de hotlistitem en funcionamiento'});
}
/**
 * 
 * @param {*} req
 * request publication id - user id - hotlist id 
 * @param {*} res 
 * response publication text - publication user name - hotlist name
 * agregar select con hotlists & categorias
 */
const saveHotlistItem = (req,res) => {
    let UserId = req.user.sub;
    let params = req.body;
    if (!UserId) return res.status(500).send({message: 'Inicie sesion antes de utilizar este metodo'});
    if (!params) return res.status(404).send({message: 'Complete los parametros para realizar el request'});
    let hotlistitem = new HotListItem();
    hotlistitem.list = params.hotlist; 
    hotlistitem.user = UserId;
    hotlistitem.publication = params.publication;
    hotlistitem.created_at = moment().unix();
    if(!hotlistitem) return res.status(500).send({message : 'completar los datos requeridos'});
    hotlistitem.save((err, hotlistItemStored)=> {
        if (err) return res.status(200).send({message: 'Error al guardar la publicacion en el hotlist'});
        return res.status(200).send({hotlistitem : hotlistItemStored});
    });
  }
  const deleteHotlistItem = (req, res) => {
    let UserId = req.user.sub;
    let hotlistItemId = req.params.id;
    HotListItem.find({'user': UserId, 'hotlistitem': hotlistItemId}).remove(err =>{
      if(err) return res.status(500).send({error: 'Error al eliminar el hotlistitem'});
      return res.status(200).send({message: 'hotlistitem eliminado correctamente'});
    });
  
  }

  
module.exports = {
      prueba,
      saveHotlistItem,
      deleteHotlistItem
    }