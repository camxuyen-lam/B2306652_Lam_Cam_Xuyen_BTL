const StaffService = require("../services/staff.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.login = async (req, res, next) => {
    const { msnv, password } = req.body;
    try {
        const staffService = new StaffService(MongoDB.client);
        const user = await staffService.Staff.findOne({ MSNV: msnv, Password: password });
        
        if (user) {
            res.send({ message: "Đăng nhập thành công", user: user });
        } else {
            res.status(401).send({ message: "Sai mã số hoặc mật khẩu" });
        }
    } catch (error) {
        return next(new ApiError(500, "Lỗi đăng nhập"));
    }
};

exports.create = async (req, res, next) => {
    if (!req.body?.HoTenNV) {
        return next(new ApiError(400, "Họ tên nhân viên không được để trống"));
    }

    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Đã có lỗi xảy ra khi thêm nhân viên"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const documents = await staffService.find({});
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi lấy danh sách nhân viên"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy nhân viên"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi lấy chi tiết nhân viên"));
    }
};