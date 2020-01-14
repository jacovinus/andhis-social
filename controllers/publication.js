/*
*Publication Controller
*/
const path = require('path');
const fs = require('fs');
const moment = require('moment');
//mongoose pagination
const mongoosePaginate = require('mongoose-pagination');
const Publication = require('../models/publication');
const User = require('../models/user.js');
const Follow = require('../models/follow');

const probandoPubli = (req,res)=>{
    res.status(200).send({message : 'Hola mundo desde el controlador de pruebas de publication'});
}
const savePublication = (req, res) => {
    let params = req.body;
    if(!params.text) return res.status(404).send({message:'Debes escribir texto para realizar la publicacion'});
    if (params.text) {
        let publication = new Publication();
        publication.user = req.user.sub;
        publication.title = params.title;
        publication.text = params.text;
        publication.file = 'null';
        publication.created_at = moment().unix();
        publication.save((err, publicationStored) => {
            if(err) return res.status(500).send({message:'Error al guardar la publicacion'});
            if (!publicationStored) return res.status(404).send({ message: 'la publicacion no ha sido guardada'});
            if(publicationStored){
                res.status(200).send({publication : publicationStored});
            }else{
                res.status(500).send({message : 'No se ha realizado la publicacion'});
            }
        });

    }else{
        res.status(200).send({message : 'Verifique los campos requeridos'});
    }
}

// Listar publicaciones
const getPublications = (req,res) => {
    let page = req.params.page ? req.params.page : 1;
    let itemsPerPage = 6;
    Follow.find({user : req.user.sub}).populate('followed').exec((err, follows) => {
    if (err) return res.status(500).send({message: 'Error al devolver el seguimiento'});
    let follows_clean = [];
    follows.forEach((follow)=>{
        follows_clean.push(follow.followed);
    });
    follows_clean.push(req.user.sub);
    Publication.find({user: {"$in": follows_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage,(err, publications, total)=>{
        if(err) return res.status(500).send({message: 'Error al obtener las publicaciones'});
        if(!publications) return res.status(404).send({message: 'No se han encontrado publicaciones'});
        //if(!total) return res.status(500).send({message: 'no se ha podido realizar un conteo de publicaciones'});
        if(publications) return res.status(200).send({
            total_items: total,
            publications: publications,
            items_per_page: itemsPerPage,
            page: page,
            pages: Math.ceil(total/itemsPerPage)
             });
         });
    });
}

// Listar publicaciones
const getUserPublications = (req,res) => {
    let page = req.params.page ? req.params.page : 1;
    let userId = req.params.user ? req.params.user : req.user.sub;
    let itemsPerPage = 6;
    Publication.find({user: userId}).sort('-created_at').populate('user').paginate(page, itemsPerPage,(err, publications, total)=>{
        if(err) return res.status(500).send({message: 'Error al obtener las publicaciones del usuario'});
        if(!publications) return res.status(404).send({message: 'No se han encontrado publicaciones del usuario'});
        //if(!total) return res.status(500).send({message: 'no se ha podido realizar un conteo de publicaciones'});
        if(publications) return res.status(200).send({
            total_items: total,
            publications: publications,
            items_per_page: itemsPerPage,
            page: page,
            pages: Math.ceil(total/itemsPerPage)
             });
         });
}
const getPublication = (req,res)=> {
    let publicationId = req.params.id;
    Publication.findById(publicationId, (err, publication)=> {
        if(err) return res.status(500).send({message : 'Error al devolver la publicacion'});
        if(!publication) return res.status(404).send({message : 'No se ha encontrado la publicacion'});
        return res.status(200).send({publication});

    })
}

const deletePublication = (req, res) => {
    let publicationId = req.params.id;
    Publication.find({'user': req.user.sub,'_id':publicationId}).remove((err,publicationRemoved)=>{
        if(err) return res.status(500).send({message : 'Error al borrar la publicacion'});
        if(!publicationRemoved) return res.status(200).send({message : 'No se ha borrado la publicacion'})
        return res.status(200).send({message : 'Publicacion eliminada correctamente'});
    });
}
const uploadImage = (req, res) => {
    let publicationId = req.params.id;
    if (req.files) {
    let file_path = req.files.image.path;
    let leftStrip = "/";
    let file_split = file_path.split(leftStrip);
    let file_name = file_split[2];
    let dotStrip = ".";
    let ext_split = file_name.split(dotStrip);
    let file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'JPG' || file_ext == 'gif') {
            // Comprobar que la publicacion sea del usuario logueado
            
                    Publication.findByIdAndUpdate(publicationId,{file: file_name},{new: true},(err, publicationUpdated)=> {
                        if (err) return res.status(500).send({message: 'Error en la peticion'});
                        if (!publicationUpdated) return res.status(404).send({ message: 'No se ha podido subir la'});
                        return res.status(200).send({publication: publicationUpdated});
                    });

        } else {

            return removeFilesOfUploads(res,file_path, 'Extension no valida');
        }

    } else {
        
        return res.status(200).send({
            message: 'No se han subido archivos o imagenes'
        });
    }
}

const removeFilesOfUploads = (res, file_path, message) => {
    fs.unlink(file_path, (err) => {
        if (err) return res.status(200).send({
            message: "imagen removida"
        });
    });
}
const authUser = (userId, message) => {
    if (userId != req.user.sub) {
        return res.status(500).send({
            message : 'usuario no autorizado'
        });
    }
}
const getImageFile = (req, res) => {
    let image_file = req.params.imageFile;
    let path_file = './uploads/publications/' + image_file;
    fs.exists(path_file, (exists) => {
        if (exists) res.sendFile(path.resolve(path_file));
        else res.status(200).send({
            message: 'No existe la imagen'
        });
    });
}

// @TODO count 'added to hotlist' 'list hotlists that added this publication'

module.exports = {
    savePublication, 
    probandoPubli, 
    getPublications,
    getPublication,
    deletePublication,
    uploadImage,
    getImageFile,
    getUserPublications
}