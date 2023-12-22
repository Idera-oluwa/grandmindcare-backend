const User = require('../models/register')

const createUser = async(req,res) =>{
    try {
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        res.status(401).json({error})
    }
}

const getUser = async(req,res) =>{
   try {
    const user = await User.find({})
    res.status(200).json({user})
   } catch (error) {
    res.status(401).json({error})
   }
}
const deleteUser = async (req,res)=>{
    const {id:taskID} = req.params;
    const user = await User.findOneAndDelete({_id:taskID})
    if(!user){
        res.status(404).json({msg:"no user with id"})
       }
       res.status(200).json({user})
}

module.exports = {
    createUser, getUser,deleteUser
}