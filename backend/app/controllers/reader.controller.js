const ReaderService = require("../services/reader.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.login = async (req, res, next) => {
    const { email, password } = req.body; 
    try {
        const readerService = new ReaderService(MongoDB.client);
        const user = await readerService.Reader.findOne({ 
            Email: email, 
            Password: password 
        });

        if (user) {
            return res.send(user);
        } else {
            return res.status(401).send({ message: "Sai tài khoản hoặc mật khẩu" });
        }
    } catch (error) {
        return next(new ApiError(500, "Lỗi hệ thống khi đăng nhập"));
    }
};

exports.create = async (req, res, next) => {
    if (!req.body?.Ten) {
        return next(new ApiError(400, "Tên độc giả không được để trống"));
    }
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi thêm độc giả"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const documents = await readerService.find({});
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi lấy danh sách độc giả"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.findById(req.params.id);
        if (!document) return next(new ApiError(404, "Không tìm thấy độc giả"));
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi lấy chi tiết độc giả"));
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
    }
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy độc giả để cập nhật"));
        }
        return res.send({ message: "Cập nhật thông tin thành công!" });
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi cập nhật thông tin"));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const readerService = new ReaderService(MongoDB.client);
        const document = await readerService.delete(req.params.id);
        if (!document) return next(new ApiError(404, "Không tìm thấy độc giả để xóa"));
        return res.send({ message: "Xóa độc giả thành công" });
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi xóa độc giả"));
    }
};