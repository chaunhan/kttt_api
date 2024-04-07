const CourseModel = require("../models/course");
const CartModel = require("../models/cart");
const ReqMua = require("../models/reqmua");
const baihoc = require("../models/baihoc");
const User = require("../models/user");

let VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const getAll = async (req, res) => {
  const keyWord = req.query.keyWord;
  const { page = 1, limit = 2 } = req.query;

  // tim ten den tu query string
  let condition = {};
  if (keyWord && keyWord.length > 0) {
    condition.TenCourse = { $regex: keyWord, $options: "i" };
  }

  // pagination có kèm theo đk
  const courselists = await CourseModel.find(condition)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  // dem so luong document thoa dk
  const count = await CourseModel.countDocuments(condition);
  return res.json({
    courselists,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};

const addCourse = async (req, res) => {
  const { TenCourse, GiaGoc, GiaCourse, SlBai, DesSP, author } = req.body;
  try {
    const cre = await CourseModel.create({
      TenCourse: TenCourse,
      GiaGoc: GiaGoc,
      GiaCourse: GiaCourse,
      DesSP: DesSP,
      SlBai: SlBai,
      author: author,
    });
    return res
      .status(200)
      .json({ message: "them khoa hoc thanh cong", data: cre });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const editCourse = async (req, res) => {
  const cId = req.params.courseID;
  console.log(req.params.courseID);
  const { TenCourse, GiaGoc, GiaCourse, SlBai, DesSP, author } = req.body;
  try {
    const updateData = {
      TenCourse: TenCourse,
      GiaGoc: GiaGoc,
      GiaCourse: GiaCourse,
      DesSP: DesSP,
      SlBai: SlBai,
      author: author,
    };
    await CourseModel.findByIdAndUpdate(cId, updateData);
    return res
      .status(200)
      .json({ message: "Update Thanh Cong", data: updateData });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const deleteCourse = async (req, res) => {
  const cId = req.params.courseID;
  await CourseModel.deleteOne({ _id: cId });
  return res.status(200).json({ mesage: "xóa thành công " });
};

const addcart = async (req, res) => {
  const info = new CartModel({
    id: req.user.UserData._id,
    TenCourse: req.body.TenCourse,
    GiaCourse: req.body.GiaCourse,
  });

  res.cookie("CourseInfo", info, {
    httpOnly: true,
    patch: "/",
    sameSite: "strict",
    secure: false,
  });
  console.log(info);
  const cre = await CartModel.create(info);
  try {
    cre;
    return res.status(200).json("Them vao gio hang" + JSON.stringify(info));
  } catch (e) {
    console.log(e);
  }
};

const guilenhMua = async (req, res) => {
  const info = new ReqMua({
    email: req.user.UserData.email,
    id: req.user.UserData._id,
    ref: req.user.UserData.ref,
    tien: req.cookies.CourseInfo.GiaCourse,
    TenCourse: req.cookies.CourseInfo.TenCourse,
    ten: req.user.UserData.ten,
  });
  const check = ReqMua.findOne({ email: req.user.UserData.email });
  if (check != null) {
    try {
      await ReqMua.findByIdAndDelete(check._id, info);
      await ReqMua.create(info);
      res.status(200).json("THEM THANH CONG");
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await ReqMua.create(info);
      res.status(200).json("THEM THANH CONG");
    } catch (e) {
      console.log(e);
    }
  }
};
const addBaihoc = async (req, res) => {
  const s = req.body;
  const a = await baihoc.create(s);
  try {
    a;
    res.json("ĐÃ THÊM");
  } catch (e) {}
};

const courseDetail = async (req, res) => {
  const courseID = req.params.TenCourse;
  console.log("req.session", req.session);

  //   const check = await User.findOne({ email: email });
  console.log(courseID);
  await CourseModel.findOne({ TenCourse: courseID }).then((course) => {
    console.log(course);
    res.json({
      user: req.session.user,
      course: course,
      tien: VND.format(course.GiaCourse),
      //   check: check.cDaMua,
    });
  });
};
const getBaiHoc = async (req, res) => {
  const cId = req.params.courseID;
  await baihoc.find({ CourseID: cId }).then((baihoc) => {
    res.json(baihoc);
  });
};

module.exports = {
  addCourse,
  editCourse,
  deleteCourse,
  getAll,
  addBaihoc,
  addcart,
  guilenhMua,
  courseDetail,
  getBaiHoc,
};
