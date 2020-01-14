/**
 * User Controller
 */
const User = require ('../models/user');
const Follow = require('../models/follow');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const paginate = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');
const Publication = require('../models/publication');
//Registro
const saveUser = (req, res) => {
    let params = req.body;
    let user = new User();
    if(params.name && params.surname && params.email && params.nick && params.password){
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email;
            user.description = params.description;
            user.nick = params.nick;
            user.tel = params.tel;
            user.role = 'ROLE_USER';
            user.image = null;
            User.find({ $or: [
                {email: user.email.toLowerCase()},
                {nick: user.nick.toLowerCase()}
               
            ]}).exec((err,users)=>{
                if(err) return res.status(500).send({message: 'Error en la peticion de usuarios'});
                if(users && users.length >= 1){
                    return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
                } else {
            bcrypt.hash(params.password, null, null, (err, hash) => {
                user.password = hash;
              });
             user.save((err, userStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el usuario'});
            if (userStored) {
                res.status(200).send({user: userStored});
            } else {
                res.status(404).send({ message: 'No se ha registrado el usuario'});
            }
        });
                }
            });
          
        
        }else{
            res.status(200).send({error : 'Verifique los campos requeridos'});
        }
}
// Login
const loginUser = (req, res) => {
    let params = req.body;
    let email = params.email;
    let password = params.password;
    User.findOne({email:email}, (err, user) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){
                    /*if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    });*/
                    //devolver datos de usuario
                    if(params.gettoken){
                  // devolver token
                    return res.status(200).send({
                        token: jwt.createToken(user)
                    });
                  // generar token
                    }else{
                        user.password = undefined;
                        return res.status(200).send({ user });
                    }

                    
                }else{
                    return res.status(404).send({message: 'Verifique los datos de ingreso'});
                }
            });
        }else{
             return res.status(404).send({
                 message: 'El usuario no se ha podido identificar'
             });
        }
    });



}
// Obtener datos de usuario
const getUser = (req, res) => {
    let userId = req.params.id;
    User.findById(userId, (err, user)=>{
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(!user) return res .status(404).send({message : 'El usuario no existe'});
        followThisUser(req.user.sub, userId).then((value)=>{
            return res.status(200).send({user, following : value.following , followed:value.followed});
         });
            
        });
}
// Async
const followThisUser = async(identity_user_id, user_id) => {
    let following = await Follow.findOne({"user":identity_user_id, "followed":user_id}).exec().then((follow) =>{
        return follow;
    }).catch((err)=>{
        return handleError(err);
    });
   
    let followed = await Follow.findOne({'user':user_id, 'followed':identity_user_id}).exec().then((follow) => {
        return follow;
    }).catch((err)=>{
        return handleError(err);
    });
    return {
        following : following,
        followed : followed
    }
}

// Devolver un listado de usuario paginado
const getUsers = (req, res) => {
    let identity_user_id = req.user.sub;
    let page = req.params.page ? req.params.page : 1;
    let itemsPerPage = 9;
    User.find().sort('_id').paginate(page, itemsPerPage,(err, users, total) =>{
    
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(!users) return res.status(404).send({message : 'No se han encontrado los usuarios'});
        followUserIds(identity_user_id).then((value)=>{

            return res.status(200).send({
                users,
                users_following : value.following,
                users_follow_me : value.followed, 
                total,
                pages: Math.ceil(total / itemsPerPage)
            });
        });
        
    });
}
const followUserIds = async(user_id) => {
        let following = await Follow.find({'user' : user_id}).select({'_id':0,'__v':0,'user':0}).exec().then((follows)=>{
            return follows;
            }).catch((err)=>{
                return handleError(err);
            });

        let followed = await Follow.find({ "followed": user_id }).select({ '_id': 0, '__v': 0, 'followed': 0 }).exec().then((follows) => {
            return follows;
        }).catch((err)=>{
            return handleError(err);
        });

    // Procesar following ids
        let following_clean = [];
        following.forEach((follow) => {
            following_clean.push(follow.followed);
        });
 
       // Procesar followed ids
        let followed_clean = [];
        followed.forEach((follow) => {
            followed_clean.push(follow.user);
            });
         /**/
    return {
        following: following_clean,
        followed: followed_clean
    }
}

// Contador de usuarios
const getCounters = (req, res) => {
        let userId = req.params.id ? req.params.id : req.user.sub;
        getCountList(userId).then((value) => {
            return res.status(200).send(value);
        });
     
}

const getCountList = async(user_id) => {
    // obtener usuarios que sigo
    let following = await Follow.count({"user" : user_id}).exec().then((count)=>{
    return count;
    }).catch((err)=>{
        return handleError(err);
    });
    // obtener usuarios que me siguen
    let followed = await Follow.count({"followed" : user_id }).exec().then((count)=>{
        return count;
    }).catch((err)=>{
        return handleError(err);
    });
    // obtener cantidad de publicaciones
    let publications = await Publication.count({
        "user": user_id
    }).exec().then((count) => {
        return count;
    }).catch((err) => {
        return handleError(err);
    });
    return {
        following,
        followed,
        publications
    }
}
// Actualizar los datos de usuario
const updateUser = (req, res) => {

    let userId = req.params.id;
    let update = req.body;
    // Borrar la propiedad password
    delete update.password;
    // Autenticacion de usuario
    if(userId != req.user.sub)return res.status(500).send({message : 'No tienes permiso para actualizar los datos del usuario'});
    // verificar si el usuario o email ya se encuentran dentro de la base de datos para no ser repetidos
    User.find({ $or: [
            {email: update.email.toLowerCase()},
            {nick: update.nick.toLowerCase()}
        ]}).exec((err,users)=>{
            users.forEach((user)=>{
                if(user && user._id != req.user.sub){
                    return res.status(500).send({error:'El usuario ya se encuentra en la base de datos'});
                }
            });
    // Actualizar los datos del usuario 
    User.findByIdAndUpdate(userId, update, {new:true},(err, userUpdated) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(!userUpdated) return res.status(404).send({message : 'No se ha podido actualizar el usuario'});
        return res.status(200).send({user: userUpdated});
    });
        })
}

// Subir datos de imagen de usuario
const uploadImage = (req, res) => {
    let userId = req.params.id;
    if (userId != req.user.sub) return removeFilesOfUploads(file_path, 'No tienes permiso para actualizar los datos del usuario');
    if(req.files){
    let file_path = req.files.image.path;
    let leftStrip = "/";
    let file_split = file_path.split(leftStrip);
    let file_name = file_split[2];
    


     // req.files.image.fieldName.path
       //let file_name = req.files.image.name;
       let dotStrip = ".";
        let ext_split = file_name.split(dotStrip);
      
        let file_ext = ext_split[1];
    
    
    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'JPG' || file_ext == 'gif') {
        // Actualizar la imagen del de usuario logueado
        User.findByIdAndUpdate(userId,{image:file_name},{new : true},(err, userUpdated)=>{
            if (err) return res.status(500).send({ message: 'Error en la peticion' });
            if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            return res.status(200).send({ user: userUpdated });
        });
        }else{
           return removeFilesOfUploads(file_path,'Extension no valida');
        }
       
    }else{
        return res.status(200).send({message : 'No se han subido archivos o imagenes'});
        }
    }
// eliminar  archivos subidos
const removeFilesOfUploads = (res, file_path, message) => {
     fs.unlink(file_path, (err) => {
         if (err) return res.status(200).send({
             message
         });
     });
}
// obtener datos de la imagen
const getImageFile = (req,res) => {
    let image_file = req.params.imageFile;
    let path_file = './uploads/users/'+image_file;
    let mock_file = './uploads/users/mock-image.jpg';
    fs.exists(path_file,(exists)=>{
    if(exists) {
        res.sendFile(path.resolve(path_file))}
        
    else {
        res.sendFile(path.resolve(mock_file))
    }
    });
}
// comprobar si hay usuario logueado
const currentUser = (req,res) => {
    let user = req.user.sub;
    if(!user) return res.status(500).send({message : 'No hay un usuario logueado'});
    return res.status(200).send({user});
}

module.exports = {
    saveUser,
    loginUser,
    getUser,
    getUsers,
    getCounters,
    updateUser,
    uploadImage,
    getImageFile,
    currentUser
}
