/**
 * Follow Controller
 */
const mongoosePaginate = require('mongoose-pagination');
const User = require('../models/user');
const Follow = require('../models/follow');

// Follow test
const prueba = (req,res) => {
    let followRequest = req.body;
    return res.status(200).send({message : 'Follows route working!'});
    }

// New Follow
 const saveFollow = (req, res) => {
     let params = req.body;
     let follow = new Follow();
     follow.user = req.user.sub;
     follow.followed = params.followed;
     follow.save((err,followStored)=>{
         if(err) return res.status(500).send({error: 'Error saving following data'});
         if(!followStored) return res.status(404).send({error : 'The follow has not been saved'}); 
         return res.status(200).send({follow : followStored});
     });
    }

 // Delete Follow
 const deleteFollow = (req, res) => {
     let userId = req.user.sub;
     let followId = req.params.id;
     Follow.find({'user' : userId, 'followed' : followId}).remove(err => {
        if (err) return res.status(500).send({error: 'Error deleting follow'});
        return res.status(200).send({message : 'Follow deleted succesfully'});
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

// List Followed Users
 const getFollowingUsers = (req, res) => {
     let userId = req.params.id && req.params.page ? req.params.id : req.user.sub;
     let page = req.params.page ? req.params.page : 1 ;
     let itemsPerPage = 4;
   
     Follow.find({user:userId}).populate({path : 'followed'}).paginate(page, itemsPerPage,(err,follows,total)=>{
        if (err) return res.status(500).send({error: 'Server error'});
        if(!follows) return res.status(404).send({error : 'This User has no follows'});
        followUserIds(req.user.sub).then((value)=>{
        return res.status(200).send({
            total,
            pages: Math.ceil(total/itemsPerPage),
            follows,
            users_following : value.following,
            users_follow_me : value.followed, 
            });
        });
        });
    }
 //List Following Users
const getFollowedUsers = (req,res) => {
      let userId = req.params.id && req.params.page ? req.params.id : req.user.sub;
      let page = req.params.page ? req.params.page : 1;
      let itemsPerPage = 4;
    
      Follow.find({ followed: userId }).populate('user').paginate(page, itemsPerPage, (err, follows, total) => {
          if (err) return res.status(500).send({ error: 'Server Error' });
          if (!follows) return res.status(404).send({ error: 'not being followed by other users'});
          return res.status(200).send({
              total,
              pages: Math.ceil(total / itemsPerPage),
              follows,
             });
       });
    }
// List followers without paginate
const getMyFollows = (req, res) => {
    let userId = req.user.sub;
    let findFollow = req.params.followed ? Follow.find({ followed: userId }) : Follow.find({ user: userId });
    findFollow.populate('user followed').exec((err,follows) => {
        if (err) return res.status(500).send({ error: 'Server Error' });
        if (!follows) return res.status(404).send({ error: 'Not following any user' });
        return res.status(200).send({ follows });
    });
    }

module.exports = { 
    prueba,
    saveFollow,
    deleteFollow,
    getFollowedUsers,
    getFollowingUsers,
    getMyFollows
    };