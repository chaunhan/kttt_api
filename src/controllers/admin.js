const reqmua = require("../models/reqmua");
const User = require("../models/user");

const editTtMua = async (req,res) => {
    const doiTrangThai = ({
        isCheck : "true",
        hoahong : 220000
    })
    const a =  await reqmua.findByIdAndUpdate(req.params.id,doiTrangThai);
    try {
        a
        console.log("Check Trạng Thái",doiTrangThai);
        console.log("id" , req.params.id)
        b = await reqMua.findById(req.params.id)
        c = await user.findOne({email: b.email})
        f = await User.findById(c.ref)
        console.log ( f , "USER ")
        g = await course.findOne({TenCourse : a.TenCourse})
        const ActiveKhoaHoc = ({
            cDaMua : "true",
        })
        const UPDATELUOTMUA = ({
            selled : g.selled + 1
        })
        i = await course.findByIdAndUpdate(g._id, UPDATELUOTMUA)
        if( f === null ) {
            console.log (" KO CÓ NGƯỜI GIỚI THIỆU")
        } else {
            const UPDATEMONEY = ({
                tien : f.tien + b.hoahong
            })
            h = await User.findByIdAndUpdate(f.id, UPDATEMONEY)
        }
        d = await User.findByIdAndUpdate(c._id,ActiveKhoaHoc);
        e = await Cart.findOneAndDelete({id: req.params.id})
        res.json("duyet Mua Thanh cong")
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

module.exports = {
    editTtMua,
}