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
    let params = req.body;
    let hotlistitem = new HotListItem();
    hotlistitem.list = params.list; 
    hotlistitem.user = params.user._id;
    hotlistitem.publication = params.publication;
    hotlistitem.created_at = moment().unix();
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

   const getHotlistItems = (req, res) => {
     //obtener publicaciones del id de publicacion de hotlistitem
     let hotlist = req.params.hotlist;
      //let userId = hotlist.user;
 
  
     let hotlistItems = HotListItem.find({'list': hotlist});
      hotlistItems.populate('list user publication').exec((error,hotlistitems) => {
       if(error) return res.status(500).send({message: 'No tiene permitido el acceso a la base de datos'});
       if(!hotlistItems) return res.status(404).send({message: 'no se han encontrado los hotlistitems'});
       return res.status(200).send({ hotlistitems });
     })
   }

module.exports = {
      prueba,
      getHotlistItems,
      saveHotlistItem,
      deleteHotlistItem
    }