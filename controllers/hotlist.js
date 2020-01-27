/**
 * Controlador de Hotlists
 *
 */
// REQUIRES
const Hotlist = require('../models/hotlist');
const User = require('../models/user');
const moment = require('moment');
const pagination = require('mongoose-pagination');
const Follow = require('../models/follow');

// test method
const hotlistTest = (req, res) => {
    let UserId = req.user.sub;
    if (!UserId) return res.status(500).send({
        message: 'No tiene permitido el uso de este metodo, por favor inicie sesion o registre un nuevo usuario'
    });
    return res.status(200).send({
        message: 'Controlador de pruebas functionando correctamente'
    });
}
// save Hotlist
const saveHotlist = (req, res) => {
    let params = req.body;
    if (!params) return res.status(404).send({
        message: 'Por favor complete los campos necesarios'
    });
    if (params) {
        console.log(params);
        let hotlist = new Hotlist();
        hotlist.listname = params.listname;
        hotlist.created_at = moment().unix();
        hotlist.updated_at = 'New List';
        hotlist.user = req.user.sub;
        hotlist.save((err, hotlistStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el hotlist'
            });
            if (!hotlistStored) return res.status(404).send({
                error: 'El hotlist no se ha guardado'
            });
            if (hotlistStored) {
                return res.status(200).send({
                    hotlist: hotlistStored
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'Verifique los campos requeridos'
        });
    }

}
// delete Hotlist
const deleteHotlist = (req, res) => {
    let UserId = req.user.sub;
    let hotlistId = req.params.id;
    if (!UserId) return res.status(500).send({
        message: 'No tiene permitido el uso de este metodo, por favor inicie sesion o registre un nuevo usuario'
    });
    if (!hotlistId) return res.status(404).send({
        message: 'No se ha encontrado la hotlist a eliminar'
    });
    Hotlist.find({
        'user': UserId,
        '_id': hotlistId
    }).remove(err => {
        if (err) return res.status(500).send({
            error: 'Error al eliminar la lista'
        });
        return res.status(200).send({
            message: 'la lista se ha eliminado correctamente'
        });
    });
}
// @TODO :  comprobar que envia parametros de id
const updateHotlist = (req, res) => {
    let params = req.body;
    let UserId = req.user.sub;
    let hotlistId = req.params.id;
    let hotlist = {};
    hotlist.listname = params.listname;
    hotlist.user = UserId;
    hotlist.updated_at = moment().unix();
    if (!UserId) return res.status(500).send({
        message: 'No tiene permitido el uso de este metodo, por favor inicie sesion o registre un nuevo usuario'
    });
    if (!hotlistId) return res.status(404).send({
        message: 'No se ha encontrado la hotlist a actualizar'
    });
    Hotlist.findByIdAndUpdate(hotlistId, hotlist, {
        new: true
    }, (err, hotlistUpdated) => {
        if (err) return res.status(500).send({
            message: 'Error al actualizar el hotlist'
        });
        if (!hotlistUpdated) return res.status(404).send({
            error: 'El hotlist no se ha actualizado'
        });
        return res.status(200).send({
            hotlist: hotlistUpdated
        });
    });
}
// @TODO como limitar la vista de hotlists
const getHotlist = (req, res) => {
    let hotlistId = req.params.id;
    Hotlist.findById(hotlistId, (err, hotlist) => {
        if (err) return res.status(500).send({
            message: 'Error en la peticion'
        });
        if (!hotlist) return res.status(404).send({
            message: 'El hotlist no existe'
        });
        return res.status(200).send({
            hotlist
        });
    });
}
//listar hotlists
const getHotlists = (req, res) => {
    let page = 1;
    let itemsPerPage = 20;
    Follow.find({
        user: req.user.sub
    }).populate('followed').exec((err, follows) => {
        if (err) return res.status(500).send({
            message: 'Error al devolver el seguimiento'
        });
        let follows_clean = [];
        follows.forEach((follow) => {
            follows_clean.push(follow.followed);
        });
        follows_clean.push(req.user.sub);
        Hotlist.find({
            user: {
                "$in": follows_clean
            }
        }).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, hotlists, total) => {
            if (err) return res.status(500).send({
                message: 'Error al obtener los hotlist'
            });
            if (!hotlists) return res.status(404).send({
                message: 'no se han encontrado hotlists'
            });
            if (hotlists) return res.status(200).send({
                total_items: total,
                hotlists: hotlists,
                items_per_page: itemsPerPage,
                page: page,
                pages: Math.ceil(total / itemsPerPage)
            });
        });
    });
}


// Export methods 
module.exports = {
    hotlistTest,
    saveHotlist,
    deleteHotlist,
    updateHotlist,
    getHotlist,
    getHotlists
}