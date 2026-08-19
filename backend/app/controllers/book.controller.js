const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi thêm sách"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const documents = await bookService.find({});
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi lấy danh sách"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) return next(new ApiError(404, "Không tìm thấy sách"));
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi tìm sách"));
    }
};

exports.update = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if (!document) return next(new ApiError(404, "Không tìm thấy sách để sửa"));
        return res.send({ message: "Cập nhật thành công" });
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi sửa sách"));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if (!document) return next(new ApiError(404, "Không tìm thấy sách để xóa"));
        return res.send({ message: "Xóa thành công" });
    } catch (error) {
        return next(new ApiError(500, "Lỗi khi xóa sách"));
    }
};