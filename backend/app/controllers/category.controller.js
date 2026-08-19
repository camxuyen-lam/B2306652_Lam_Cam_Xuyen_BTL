const CategoryService = require("../services/category.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res) => {
    const service = new CategoryService(MongoDB.client);
    const document = await service.create(req.body);
    return res.send(document);
};
exports.findAll = async (req, res) => {
    const service = new CategoryService(MongoDB.client);
    const documents = await service.find({});
    return res.send(documents);
};
exports.delete = async (req, res) => {
    const service = new CategoryService(MongoDB.client);
    await service.delete(req.params.id);
    return res.send({ message: "Xóa thành công" });
};