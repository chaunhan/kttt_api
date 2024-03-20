const CourseModel = require('../models/course');


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
    const {TenCourse, GiaGoc, GiaCourse, DesSP, author} = req.body
    try {
        const cre = await CourseModel.create({
            TenCourse: TenCourse,
            GiaGoc: GiaGoc,
            GiaCourse: GiaCourse,
            DesSP: DesSP,
            author: author,
        })
        return res.status(200).json({ message: "them khoa hoc thanh cong", data: cre });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const editCourse = async (req, res) => {
    const s = (req.body);
    console.log("sdsad ",s);
    try {
        await CourseModel.findByIdAndUpdate(req.params.id,s);
        return res.status(200).json({ message: "Update Thanh Cong", data: s });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

const deleteCourse = async (req, res) => {
    const { cId } = req.params
    await CourseModel.deleteOne({ _id: cId })
    return res.status(200).json({ mesage: "xóa thành công " })
  }

module.exports = {
    addCourse,
    editCourse,
    deleteCourse,
    getAll,

}