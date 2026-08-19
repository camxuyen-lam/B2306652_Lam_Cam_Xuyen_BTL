const BorrowService = require("../services/borrow.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

exports.createRequest = async (req, res, next) => {
    const { MaDocGia, cartItems } = req.body;
    try {
        const db = MongoDB.client.db();
        const checkDebt = await db.collection("theodoimuonsach").findOne({
            MaDocGia: MaDocGia,
            TrangThai: { $in: ["MatSach", "TreHen", "ChoXacNhanTien"] }
        });
        if (checkDebt) {
            return res.status(403).send({ message: "Bạn đang nợ sách hoặc chưa đóng phạt nhe! ❌" });
        }
        for (const item of cartItems) {
            await db.collection("theodoimuonsach").insertOne({
                MaDocGia, MaSach: item.MaSach, TenSach: item.TenSach, HinhAnh: item.HinhAnh,
                NgayMuon: new Date(), HanTra: new Date(Date.now() + 14*24*60*60*1000), TrangThai: "ChoDuyet"
            });
            await db.collection("sach").updateOne({ MaSach: item.MaSach }, { $inc: { SoQuyen: -1 } });
        }
        res.send({ message: "Gửi yêu cầu thành công!" });
    } catch (error) { return next(new ApiError(500, "Lỗi mượn sách")); }
};

exports.findAll = async (req, res) => {
    try {
        const borrowService = new BorrowService(MongoDB.client);
        res.send(await borrowService.find({}));
    } catch (error) { res.status(500).send({ message: "Lỗi lấy danh sách" }); }
};

exports.approveBorrow = async (req, res) => {
    try {
        const borrowService = new BorrowService(MongoDB.client);
        await borrowService.updateStatus(req.params.id, "DangMuon");
        res.send({ message: "Đã duyệt!" });
    } catch (error) { res.status(500).send({ message: "Lỗi duyệt" }); }
};

exports.rejectBorrow = async (req, res) => {
    try {
        const db = MongoDB.client.db();
        const id = new ObjectId(req.params.id);
        const record = await db.collection("theodoimuonsach").findOne({ _id: id });
        await db.collection("theodoimuonsach").updateOne({ _id: id }, { $set: { TrangThai: "TuChoi" } });
        await db.collection("sach").updateOne({ MaSach: record.MaSach }, { $inc: { SoQuyen: 1 } });
        res.send({ message: "Đã từ chối" });
    } catch (error) { res.status(500).send({ message: "Lỗi từ chối" }); }
};

exports.returnBook = async (req, res) => {
    try {
        const db = MongoDB.client.db();
        const id = new ObjectId(req.params.id);
        const record = await db.collection("theodoimuonsach").findOne({ _id: id });
        await db.collection("theodoimuonsach").updateOne({ _id: id }, { $set: { TrangThai: "DaTra", NgayTra: new Date() } });
        await db.collection("sach").updateOne({ MaSach: record.MaSach }, { $inc: { SoQuyen: 1 } });
        res.send({ message: "Đã trả sách" });
    } catch (error) { res.status(500).send({ message: "Lỗi trả sách" }); }
};

exports.reportLostUser = async (req, res) => {
    try {
        const db = MongoDB.client.db();
        await db.collection("theodoimuonsach").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { TrangThai: "MatSach", TienPhat: 200000 } }
        );
        res.send({ message: "Đã báo mất" });
    } catch (error) { res.status(500).send({ message: "Lỗi báo mất" }); }
};

exports.userConfirmPayment = async (req, res) => {
    try {
        const db = MongoDB.client.db();
        await db.collection("theodoimuonsach").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { TrangThai: "ChoXacNhanTien" } }
        );
        res.send({ message: "Đã báo nộp tiền" });
    } catch (error) { res.status(500).send({ message: "Lỗi xác nhận" }); }
};

exports.adminConfirmFine = async (req, res) => {
    try {
        const db = MongoDB.client.db();
        await db.collection("theodoimuonsach").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { TrangThai: "DaDongPhat", DaThuTien: true } }
        );
        res.send({ message: "Đã thu tiền" });
    } catch (error) { res.status(500).send({ message: "Lỗi thu tiền" }); }
};
exports.sendFeedback = async (req, res, next) => {
    try {
        const db = MongoDB.client.db();
        const id = new ObjectId(req.params.id);
        const { noiDung, hinhAnh } = req.body;

        await db.collection("theodoimuonsach").updateOne(
            { _id: id },
            { 
                $set: { 
                    GopY: noiDung, 
                    HinhAnhMinhChung: hinhAnh || null, 
                    NgayGopY: new Date() 
                } 
            }
        );
        res.send({ message: "Cảm ơn bạn đã góp ý nhe! Thư viện đã nhận được rồi." });
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi gửi góp ý"));
    }
};