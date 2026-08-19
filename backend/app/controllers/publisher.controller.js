const PublisherService = require("../services/publisher.service");
const MongoDB = require("../utils/mongodb.util");
exports.create = async (req, res) => {
    const publisherService = new PublisherService(MongoDB.client);
    const document = await publisherService.create(req.body);
    return res.send(document);
};
exports.findAll = async (req, res) => {
    const publisherService = new PublisherService(MongoDB.client);
    const documents = await publisherService.find({});
    return res.send(documents);
};