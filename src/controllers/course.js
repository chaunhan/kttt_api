const CourseModel = require('../models/course');
const CartModel = require('../models/cart')
const ReqMua = require('../models/reqmua');
const baihoc = require('../models/baihoc');

const getAll = async (req, res) => {
    const keyWord = req.query.keyWord
    const { page = 1, limit = 2 } = req.query
  
    // tim ten den tu query string
    let condition = {}
    if (keyWord && keyWord.length > 0) {
      condition.TenCourse = { $regex: keyWord, $options: "i" }
    }
  
    // pagination có kèm theo đk
    const courselists = await CourseModel.find(condition)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
  
  
      // dem so luong document thoa dk
    const count = await CourseModel.countDocuments(condition)
    return res.json({
        courselists,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
}

const addCourse = async (req,res) => {
    const {TenCourse, GiaGoc, GiaCourse, SlBai, DesSP, author} = req.body
    try {
        const cre = await CourseModel.create({
            TenCourse: TenCourse,
            GiaGoc: GiaGoc,
            GiaCourse: GiaCourse,
            DesSP: DesSP,
            SlBai: SlBai,
            author: author,
        })
        return res.status(200).json({ message: "them khoa hoc thanh cong", data: cre });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const editCourse = async (req, res) => {
    const cId = req.params.courseID
    console.log(req.params.courseID);
    const {TenCourse, GiaGoc, GiaCourse, SlBai, DesSP, author} = req.body
    try {
        const updateData = ({
            TenCourse: TenCourse,
            GiaGoc: GiaGoc,
            GiaCourse: GiaCourse,
            DesSP: DesSP,
            SlBai: SlBai,
            author: author,
        })
        await CourseModel.findByIdAndUpdate(cId,updateData);
        return res.status(200).json({ message: "Update Thanh Cong", data: updateData });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const deleteCourse = async (req, res) => {
    const cId = req.params.courseID
    await CourseModel.deleteOne({ _id: cId })
    return res.status(200).json({ mesage: "xóa thành công " })
  }

const addcart = async (req,res) => {
    const info = new CartModel({
        id : req.session.user._id,
        TenCourse : req.body.TenCourse,
        GiaCourse : req.body.GiaCourse
    })
    console.log(info)
    const tien = VND.format(info.GiaCourse)
    const cre = await Cart.create(info);
    try{
        cre
        return res.status(200).json("Them vao gio hang", {giatien: tien , user: req.session.user , info : info})
    } catch (e) {
        console.log(e)
    }
}

const guilenhMua = async (req,res) => {
    const {email , _id, GiaCourse , TenCourse, ten , ref} = req.body
    console.log(email , _id, GiaCourse)
    const info = new ReqMua({
        email: email,
        id: _id,
        ref: ref,
        tien: GiaCourse,
        TenCourse: TenCourse,
        ten: ten
    })
    const check = ReqMua.findOne({email: email})
    if (check != null) {
        try {
        const del = await ReqMua.findByIdAndDelete(check._id,info)
        const cre = await ReqMua.create(info)
        } catch (e) {
        console.log(e)
        }
    }else {
        try {
        const cre = await ReqMua.create(info)
        } catch (e) {
        console.log(e)
        }
    }
}
const addBaihoc = async (req,res) => {
    const s = req.body
    const a = await baihoc.create(s)
    try {
        a
        res.json("ĐÃ THÊM")
    }catch (e) {
    }
}

module.exports = {
    addCourse,
    editCourse,
    deleteCourse,
    getAll,
    addBaihoc,
    addcart,
    guilenhMua,
    
}