/**
 * Like Controller
 */
const mongoosePaginate = require('mongoose-pagination');
const User = require('../models/user');
const Publication = require('../models/publication');
const Like = require('../models/like');
const Follow = require('../models/follow');
const moment = require('moment');

// like test 
const prueba = (req, res) => {
    let UserId = req.user.sub ? req.user.sub : null;
    return res.status(200).send({message : 'controlador de likes en funcionamiento'});
}
const saveLike = (req, res) => {
    let params = req.body;
    let UserId = req.user.sub ? req.user.sub:null;
    if(!params) return res.status(500).send({message: 'Debe enviar los parametros necesarios para crear el like'});
    if(params){
        let like = new Like();
        like.user = UserId;
      // @TODO setear params . liked = id de publicacion a la que se le dio like
        like.liked = params.liked;
        like.created_at = moment().unix();
        like.save((err,likeStored)=>{
            if(err) return res.status(500).send({message: 'No se ha podido guardar el like debido a un error'});
            if(!likeStored) return res.status(404).send({message:'no se ha encontrado el like enviado'});
            return res.status(200).send({like: likeStored});
        });
    }
   
}

const deleteLike = (req, res) => {
    let UserId = req.user.sub ? req.user.sub : null;
    if(!UserId) return res.status(500).send({message: 'no tiene permiso para realizar esta acción'});
    let params = req.params;
    let likeId =  req.params.id;
    if(!params) return res.status(500).send({message:'debe enviar los parametros requeridos para esta accion'});
    Like.find({'user':UserId,'liked':likeId}).remove(err =>{
        if(err) return res.status(500).send({message:'error al eliminar el like'});
        return res.status(200).send({message:'Like eliminado'});
    });
}

const getLike = (req,res)=>{
let UserId = req.user.sub ? req.user.sub : null;
let params = req.params;
let likeId = params.id;
Like.find({'user':UserId,'liked':likeId})
}

const getLikes = (req,res) => {

}

module.exports = {
    prueba,
    saveLike,
    deleteLike,
    getLike,
    getLikes,
}