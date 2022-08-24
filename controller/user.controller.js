const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  else {
    UserModel.findById(req.params.id, (error, docs) => {
      if (!error) res.send(docs);
      else console.log("Id unknown" + error);
    }).select("-password");
  }
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  else {
    try {
       UserModel.findByIdAndUpdate(
        req.params.id,
        {bio:req.body.bio},
        {new:true, setDefaultsOnIndex:true},
        (err,doc)=>{
          if(err) return res.status(500).json({message:err})
          return res.send(doc)
        })
    } catch (error) {
      return console.log(error);
    }
  }
};

module.exports.deleteUser = async (req,res) =>{
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try{
        UserModel.deleteOne({ _id: req.params.id}).exec()
        res.status(200).json({message: "succesfully deleted."})
    }catch(err){
        return console.log(err)
    }
}


module.exports.follow = (req,res) =>{
  if (!ObjectID.isValid(req.params.id)||!ObjectID.isValid(req.body.idToFollow))
  return res.status(400).send("ID unknown : " + req.params.id);
  
  try{
    //add to the follower list  
      UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet:{following: req.body.idToFollow}
        },
        {new:true, upsert:true},
        (err,docs) =>{
          if(!err) res.status(201).json(docs)
          else return res.status(400).json(err)
        }
      )
      //add to the following list
       UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        {
          $addToSet:{followers: req.params.id}
        },
        {new:true, upsert:true},
        (err,docs) =>{
          if(err) return res.status(400).json(err)
        }
        )
        
    }catch(err){
      return console.log(err)
    }
  }
  
  module.exports.unfollow = async (req,res) =>{
    if (!ObjectID.isValid(req.params.id)||!ObjectID.isValid(req.body.idToUnFollow))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try{
         //delete to the follower list  
      UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull:{following: req.body.idToUnFollow}
        },
        {new:true, upsert:true},
        (err,docs) =>{
          if(!err) res.status(201).json(docs)
          else return res.status(400).json(err)
        }
      )
      //delete to the following list
       UserModel.findByIdAndUpdate(
        req.body.idToUnFollow,
        {
          $pull:{followers: req.params.id}
        },
        {new:true, upsert:true},
        (err,docs) =>{
          if(err) return res.status(400).json(err)
        }
        )
        
    }catch(err){
      return console.log(err)
    }
  }