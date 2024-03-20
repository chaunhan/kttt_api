const UserModel = require('../models/user');
const { comparePassword, hashPassword } = require('../utils');
require('dotenv/config');

const getAll = async (req,res) => {
    const keyWord = req.query.keyWord
    const { page = 1, limit = 2 } = req.query
  
    // tim ten den tu query string
    let condition = {}
    if (keyWord && keyWord.length > 0) {
      condition.email = { $regex: keyWord, $options: "i" }
    }
  
    // pagination có kèm theo đk
    const userlists = await UserModel.find(condition)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
  
  
      // dem so luong document thoa dk
    const count = await UserModel.countDocuments(condition)
    return res.json({
      userlists,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
}

const editProfile = async (req,res) => {
    const userID = req.params
    const {ten, address, sex, phone} = (req.body);
    try {
        const updateData = ({
            _id: _id,
            ten: ten,
            address: address,
            sex: sex,
            phone: phone
        })
        console.log(s, "data")
        await UserModel.findByIdAndUpdate(userID, updateData);
        res.status(200).json("Da update")
    } catch (error) {
        res.status(500).json(error);
    }
}
const delUser = async (req,res) => {
    const { userId } = req.params
    await UserModel.deleteOne({ _id: userId })
    return res.status(200).json({ mesage: "xóa thành công " })
}

const changePass = async (req, res) => {
    const {userID} = req.params
    const {pass, newpass} = (req.body);
    const comparePassword = await comparePassword(pass, pass);
    if(comparePassword == true) {
        try {
            const hashed = await hashPassword(newpass)
                const updatePass = ({pass: hashed});
            const a =  await UserModel.findByIdAndUpdate(userID, updatePass);
            res.status(200).json("Da update")
        } catch (error) {
            res.status(500).json(error);
        }
    } else{
        res.status(500).json("sai mat khau cu")
    }
}

module.exports = {
    getAll,
    editProfile,
    delUser,
    changePass,

}